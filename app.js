const express = require('express');
const data = require('./data.json');
const projectData = data.projects;
const path = require('path').posix;
const app = express();


//midddleware
app.set("view engine", "pug");

//static route
app.use(express.static('public'));

//homepage route
app.get('/', (req, res) => {
    res.locals = data.projects;
    res. render('index');
    res.end();
})

app.get('/about', (req, res) =>{
    // const err = new Error('Server Error');
    // err.status = 500;
    // next(err);
    res.render('about');
})

app.get('/project/:id', (req, res) => {
    const requestedProject = projectData[req.params.id];
    res.render('project', {projectName: requestedProject.project_name, description: requestedProject.description, technologies: requestedProject.technologies, liveLink: requestedProject.live_link, gitHubLink: requestedProject.github_link});
})

app.use((req, res, next)=>{
    const err =  new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

app.use( (err, req, res, next) => {
    // res.locals.error = err;
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500, 
            message: err.message || 'Internal Server Error',
        },
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})