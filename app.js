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

app.get('/about', (req, res) =>{
    res.render('about');
})

app.get('/project/:id', (req, res) => {
    const requestedProject = projects[req.params.id];
    if (requestedProject){
        res.render('project', {projectName: requestedProject.project_name, description: requestedProject.description, technologies: requestedProject.technologies, liveLink: requestedProject.live_link, gitHubLink: requestedProject.github_link, imgUrls: requestedProject.image_urls});
    } else {
        next();
    }
})

app.use((req, res, next)=>{
    const err =  new Error('Requested Page Not Found');
    err.status = 404;
    console.log(`Error status ${err.status}, ${err.message}`);
    next(err);
});

app.use( (err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500, 
            message: err.message || 'Internal Server Error. Please try again later.',
        },
    });
});

app.listen(3000, () => {
    console.log('The application is listening on localhost:3000');
})