const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route');
const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcom to contact book application.' });
});

app.use('/api/contacts', contactRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal server error" });
});

module.exports = app;