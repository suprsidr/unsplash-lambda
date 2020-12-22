'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const API_KEY = 'YOUR_API_KEY';
const url = 'https://api.unsplash.com';

const app = express();

app.use(cors());

const sendResponse = async (res, fetchUrl) => {
  try {
    const response = await fetch(fetchUrl);
    const json = await response.json();
    res.json({ error: null, results: json.results || json });
  } catch (err) {
    res.json({ error: 'Bad Request', results: [] })
  }
}

// Routes
app.get('/download/:id', (req, res) => {
  const fetchUrl = `${url}/photos/${req.params.id}/download?client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});
app.get('/collections/:id', (req, res) => {
  const fetchUrl = `${url}/collections/${req.params.id}?client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});
app.get('/collections/:id/photos/:page', (req, res) => {
  const fetchUrl = `${url}/collections/${req.params.id}/photos?page=${req.params.page}&per_page=30&client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});
app.get('/search/photos/:query/:page', (req, res) => {
  const fetchUrl = `${url}/search/photos?query=${req.params.query}&page=${req.params.page}&per_page=30&client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});
app.get('/search/collections/:query/:page', (req, res) => {
  const fetchUrl = `${url}/search/collections?query=${req.params.query}&page=${req.params.page}&per_page=10&client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});
app.get('/users/:user_name/collections/:page', (req, res) => {
  const fetchUrl = `${url}/users/${req.params.user_name}/collections?page=${req.params.page}&per_page=10&client_id=${API_KEY}`;
  sendResponse(res, fetchUrl);
});

// 404
app.use(function (req, res, next) {
  res.status(404).send('Not Found')
})

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
