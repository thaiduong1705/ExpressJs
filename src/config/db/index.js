const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://dbTest:abc123456789@test.j42uwwf.mongodb.net/test"
        );
        console.log("Connect successfully");
    } catch {
        console.log("Connect fail");
    }
}

module.exports = { connect };
