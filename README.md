# motus
Projet Micro service
## First step was creation of motus game using nodeJS
On data, run nodejs app on terminal
# Haproxy
Create two server on port 3000 and 4000 by running nodejs app on folder \port
Copy Past the haproxy.cfg into etc/haproxy and then run "sudo systemctl restart haproxy" on CLI, now the API can also be open on port 3001
We set weight of 3 on port 3000 and weight 1 on port 4000
Then if I just run the port 3000, the port 3001 have 75% chance to serve the motus app and 25% chance to not find the server.
![Alt text](https://github.com/severine-Rachel/motus/blob/main/README-Image/weight3port3000.png"a title")
![Alt text](https://github.com/severine-Rachel/motus/blob/main/README-Image/weight1port4000.png"a title")
