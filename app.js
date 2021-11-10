const express = require('express');
const { projects } = require('./data.json');
const app = express();


//midddleware
app.set("view engine", "pug");

//static route
app.use('/static', express.static('public'));

//homepage route
app.get('/', (req, res) => {
    res.render('index', { projects });
    res.end();
});

app.get('/about', (req, res, next) =>{
    res.render('about');
})

app.get('/project/:id', (req, res, next) => {
    const requestedProject = projects[req.params.id];
    if (requestedProject){
        res.render('project', { requestedProject });
        } else {
            next();
        }
    });

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

app.listen(3000, () => {
    console.log('The application is listening on localhost:3000');
})
