const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, '/public')));


app.get("/", (req, res) => {
  res.render('index');
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/project/:id", (req, res) => {
  const id = req.params;
  if (id === 0) {
    console.log("show first project");
  }
  else if (id === 1) {
    console.log("show second project");
  }
  else if (id === 2) {
    console.log("show third project");
  }
  else {
    console.log("this path does not exist");
  }

})

app.listen(3000, () => {
  console.log("server started on port 3000");
});
