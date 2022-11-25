const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');
const { projects } = require('./data.json');

const app = express();

// Set view engine to pug files
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, '/public')));

// Get home route
app.get("/", (req, res) => {
  // render the pug index file, with the projects from data.json
  res.render('index', { projects });
});

// Get about route
app.get("/about", (req, res) => {
  // render pug about file
  res.render('about');
});

// Get the individual projects
app.get("/project/:id", (req, res, next) => {

  // if the project exists by matching the url passed in
  if (projects[req.params.id]) {
    // render the pug project page with the corresponding project data
    res.render('project', {
      name: projects[req.params.id].project_name,
      description: projects[req.params.id].description,
      technologies: projects[req.params.id].technologies,
      liveLink: projects[req.params.id].live_link,
      githubLink: projects[req.params.id].github_link,
      images: projects[req.params.id].image_urls
    });
    // If project does not exist show 404 error
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry this page does not exist";
    next(err)
  }
});

// If page does not exist, 404 error
app.use((req, res, next) => {
  const err = new Error();
    err.status = 404;
    err.message = "Sorry this page does not exist";
    next(err);
})

// If there is 404 error then show that error
// If not then show server error
app.use((err, req, res, next) => {
  if (err) {
    console.log("Oops there was an error", err);
  }

  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    err.message = err.message || "Oops, it looks like something went wrong there, please try again";
    res.status(err.status || 500).render("error", { err });
  }
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});
