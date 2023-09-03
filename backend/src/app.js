const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();


// routes
const authRoute = require('../routes/authRoute');
const userRoute = require('../routes/userRoute');
const productRoute = require('../routes/productRoute');
const systemRoute = require('../routes/systemRoute');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(logger("dev")); // for logs 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is up and running 🛠"
    })
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/system", systemRoute);
app.use("/api/product", productRoute);


app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not found, Check the URL properly !!!' });
})

app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;