const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect()
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((error) => {
                console.log("Database connection error: " + error);
            })
    }
}

module.exports = new Database();