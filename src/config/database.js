const { connect } = require('mongoose');
const config = require('./config');
const databaseConnect = require("./global");

class Database {
    async connect() {
        try {
            await connect(config.MONGODB_URI)
            console.log('database connected');
        } catch (err) {
            console.log(config.MONGODB_URI);
            console.error('database not connected');
            // setTimeout(() => Database.connect(), 1000);
        }
    }
    async verifyConntecion() {
        return databaseConnect;
    }
}

module.exports = Database;