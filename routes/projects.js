const express = require('express');
const router = express.Router();
const { data } = require('../data/portfolio-data.json');
const { projects } = data;

router.get('/projects?', (req, res) => {
  const firstProject = projects[0].id;
  res.redirect(`/project/${firstProject}`);
});

router.get('/project/:id', (req, res) => {
  const { id } = req.params;

  if (id >= projects.length) {
    const err = new Error('Sorry! This project does not exist!');
    err.status = 404;
    return res.render('error', { error: err });
  }

  const { project_name } = projects[id];
  const { description } = projects[id];
  const { technologies } = projects[id];
  const { live_link } = projects[id];
  const { github_link } = projects[id];
  const { image_urls } = projects[id];

  const templateData = { id, project_name, description, technologies, live_link, github_link, image_urls };

  res.render('project', templateData);
});

module.exports = router;