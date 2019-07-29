const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { data } = require('./data/portfolio-data.json');
const { projects } = data;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects', (req, res) => {
  const firstProject = projects[0].id;
  res.redirect(`/project/${firstProject}`);
});

app.get('/project/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    const firstProject = projects[0].id;
    return res.redirect(`/project/${firstProject}`)
  }

  const { project_name } = projects[id];
  const { description } = projects[id];
  const { technologies } = projects[id];
  const { live_link } = projects[id];
  const { github_links } = projects[id];
  const { image_urls } = projects[id];

  const templateData = { id, project_name, description, technologies, live_link, github_links, image_urls };

  res.render('project', templateData);
});

app.use((req, res, next) => {
  const err = new Error('Sorry! This page does not exist!');
  err.status = 404;
  next(err);
})

app.listen(port, () => console.log(`Portfolio site listening on port ${port}!`));