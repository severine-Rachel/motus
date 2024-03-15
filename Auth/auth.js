const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const ejs = require('ejs'); // Ajoutez cette ligne
const crypto = require('crypto');

const app = express();

// Configuring express-session middleware
app.use(session({
    secret: '2256ds45f4sdqf4qsd54fsqd54fsd5f',
    resave: false,
    saveUninitialized: false
}));

app.use(cors({
  origin: 'https://localhost:4002'
}));

// Middleware to redirect unauthenticated users to the login page
const redirectToLogin = (req, res, next) => {
    console.log
    if (!req.session.username) {
        console.log(req.session.username)
        res.redirect('/login');
    } else {
        next();
    }
};

// Middleware to parse incoming request body
app.use(express.urlencoded({ extended: true }));

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// REGISTER //
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// REGISTER //
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body; // Ajout de confirmPassword
    if (!username || !email || !password || !confirmPassword) { // Vérifiez aussi la présence de confirmPassword
        res.status(400).send('Missing username, email, password, or confirmPassword');
        return;
    }
    if (password !== confirmPassword) { // Vérifiez si les mots de passe correspondent
        res.status(400).send('Passwords do not match');
        return;
    }
    // Load user data
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        let users = [];
        if (data) {
            users = JSON.parse(data).users;
        }

        // Check if username or email already exists
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            res.status(409).send('Username or email already exists');
            return;
        }
        // Add new user
        const hashedPassword = hashPassword(password)
        const newUser = { username, email, hashedPassword };
        users.push(newUser);
        // Update user data file
        fs.writeFile('users.json', JSON.stringify({ users }), 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/login'); // Redirect to login page after successful registration
        });
    });
});


// LOGIN //
app.get('/login', (req, res) => {
    // If user is already logged in, redirect to index
    if (req.session.username) {
        res.redirect('/index');
    } else {
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('Missing username or password');
        return;
    }
    // Check if users.json exists
    if (fs.existsSync('users.json')) {
        // Read user credentials from JSON file
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                const users = JSON.parse(data).users;
                loginUser(username, password, users, req, res);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                res.status(500).send('Internal Server Error');
            }
        });
    } else {
        // If users.json doesn't exist, treat it as empty
        loginUser(username, password, [], req, res);
    }
});

function loginUser(username, password, users, req, res) {
    const user = users.find(user => user.username === username && user.hashedPassword === hashPassword(password));
    if (user) {
        req.session.username = username;
        res.redirect('/index');
    } else {
        // Redirection vers la page de connexion avec un message d'erreur
        res.redirect('/login?error=invalid_credentials');
    }
}

// LOGOUT
app.get('/logout', (req, res) => {
    // Déconnexion de l'utilisateur en supprimant la session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Redirection vers la page de connexion après la déconnexion
        res.redirect('/login');
    });
});

// Main Page //
app.get('/index', redirectToLogin, (req, res) => {
    if (req.session.username) {
        // Load user data
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const users = JSON.parse(data).users;
            const currentUser = users.find(user => user.username === req.session.username);
            if (currentUser) {
                // Render index.ejs with username data
                ejs.renderFile(__dirname + '/public/index.ejs', { username: currentUser.username }, (err, html) => {
                    if (err) {
                        console.error('Error rendering file:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.send(html);
                });
            } else {
                res.status(404).send('User not found');
            }
        });
    } else {
        res.redirect('/login'); // Redirect if not authenticated
    }
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});