const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnection');
const authRoutes = require('./routes/authRouter');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
