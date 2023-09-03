const mongoose = require("mongoose");

const HOST = process.env.DB_CONNECTION_STRING;

(async () => {
    try {
        const connection = await mongoose.connect(HOST, {
            dbName: "RS_Cinema1",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        }).then((res) => {
            console.log(`Connected to department database --> host : ${res.connection.name}`);
        });
    } catch (error) {
        console.error(error);
    }
})();

const conn = mongoose.connection;

module.exports = conn;
