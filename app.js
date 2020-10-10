const express = require('express');
const app = express();
const imageRoute = require('./api/routes/image');
app.use('/image', imageRoute);
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req,res, next) => {
    res.status(error.status || 500);
    res.json({
        Error:{
            message: error.message
        }
    })
});
module.exports = app;