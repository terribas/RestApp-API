import app from './app';
import './database';

//https configuration
const https = require("https"),
  fs = require("fs"),
  helmet = require('helmet');

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/restapp.duckdns.org/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/restapp.duckdns.org/fullchain.pem"),
  dhparam: fs.readFileSync("/home/openssl/dh-strong.pem")
};

app.use(helmet({
    contentSecurityPolicy: false
}))

app.listen(3000);
console.log("Server listening at port 3000");

https.createServer(options, app).listen(5000);
