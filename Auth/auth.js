const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const ejs = require('ejs');
const crypto = require('crypto');

const app = express();

app.use(session({
    secret: '2256ds45f4sdqf4qsd54fsqd54fsd5f',
    resave: false,
    saveUninitialized: false
}));

app.use(cors({
  origin: 'https://localhost:4002'
}));

const redirectToLogin = (req, res, next) => {
    console.log
    if (!req.session.username) {
        console.log(req.session.username)
        res.redirect('/login');
    } else {
        next();
    }
};

app.use(express.urlencoded({ extended: true }));

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        res.status(400).send('Missing username, email, password, or confirmPassword');
        return;
    }
    if (password !== confirmPassword) {
        res.status(400).send('Passwords do not match');
        return;
    }
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

        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            res.status(409).send('Username or email already exists');
            return;
        }
        const hashedPassword = hashPassword(password)
        const newUser = { username, email, hashedPassword };
        users.push(newUser);
        fs.writeFile('users.json', JSON.stringify({ users }), 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/login');
        });
    });
});

app.get('/login', (req, res) => {
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
    if (fs.existsSync('users.json')) {
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
        loginUser(username, password, [], req, res);
    }
});

function loginUser(username, password, users, req, res) {
    const user = users.find(user => user.username === username && user.hashedPassword === hashPassword(password));
    if (user) {
        req.session.username = username;
        res.redirect('/index');
    } else {
        res.redirect('/login?error=invalid_credentials');
    }
}

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/login');
    });
});

app.get('/index', redirectToLogin, (req, res) => {
    if (req.session.username) {
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const users = JSON.parse(data).users;
            const currentUser = users.find(user => user.username === req.session.username);
            if (currentUser) {
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
        res.redirect('/login');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});