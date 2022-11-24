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

app.get("/project/:id", (req, res, next) => {

  if (projects[req.params.id]) {
    res.render('project', {
      name: projects[req.params.id].project_name,
      description: projects[req.params.id].description,
      technologies: projects[req.params.id].technologies,
      liveLink: projects[req.params.id].live_link,
      githubLink: projects[req.params.id].github_link,
      images: projects[req.params.id].image_urls
    });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry this page does not exist";
    next(err)
  }
});

app.get("/error", (req, res, next) => {
  const err = new Error();
  err.message = "Custom 500 error thrown";
  err.status = 500
  throw err
})

app.use((req, res, next) => {
  res.status(404).render("page-not-found");
})

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
