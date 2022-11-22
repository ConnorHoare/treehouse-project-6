const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
  res.render('index', { projects });
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/project/:id", (req, res) => {

  res.render('project', {
    name: projects[req.params.id].project_name,
    description: projects[req.params.id].description,
    technologies: projects[req.params.id].technologies,
    liveLink: projects[req.params.id].live_link,
    githubLink: projects[req.params.id].github_link,
    images: projects[req.params.id].image_urls
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
