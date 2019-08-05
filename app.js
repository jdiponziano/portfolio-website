const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mainRoutes = require('./routes');
const projectRoutes = require('./routes/projects');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

//App routes
app.use(mainRoutes);
app.use(projectRoutes);

//Error Handling
app.use((req, res, next) => {
  const err = new Error('Sorry! This page does not exist!');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  console.log(`Oops! This is embarrassing there appears to be a ${err.status} error. Please hang tight while we work it out!`);
  res.render('error', { error: err });
});

app.listen(port, () => console.log(`Portfolio site listening on port ${port}!`));