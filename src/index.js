const serverless = require('serverless-http');
const config = require('./config/config');
const Database = require('./config/database');
const app = require('./app');

const port = config.PORT;

//MongoDB conecction
const db = new Database();
db.connect();

if (config.LOCAL !== false) {
    app.listen(port, () => console.log('Server running:', port));
} else {
    module.exports.handler = serverless(app);
}