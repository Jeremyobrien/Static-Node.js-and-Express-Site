//variables
const express = require('express');
const { projects } = require('./data.json');
const app = express();
var port = process.env.PORT || 3000;

//midddleware
app.set("view engine", "pug");

//static route
app.use('/static', express.static('public'));

//homepage route
app.get('/', (req, res) => {
    res.render('index', { projects });
    res.end();
});

//about route
app.get('/about', (req, res, next) =>{
    res.render('about');
})

//project route
app.get('/project/:id', (req, res, next) => {
    const requestedProject = projects[req.params.id];
    if (requestedProject){
        res.render('project', { requestedProject });
        } else {
            next();
        }
    });

//404 handler
app.use((req, res, next)=>{
    const err =  new Error('Requested Page Not Found. Please try again.');
    err.status = 404;
    if (err.status === 404) {
        console.log(`Error status ${err.status}, ${err.message}`);
        res.render('page-not-found', {err});
    } else {
        next(err);
    } 
});

//global handler
app.use( (err, req, res, next) => {
    const error = err;
    res.status(err.status || 500);
    if (!err.message){
        error.message = 'Internal Server Error. Please try again later.'
    } else {
        error.message =  err.message;
    }
    res.render('error', {error} );
});

//listener
app.listen( port, () => {
    console.log('The application is listening ');
})
