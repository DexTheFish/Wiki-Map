/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.send("show all active maps");
  });

  router.post("/", (req, res) => {
    res.send('Create a new map');
  })

  router.get("/new", (req, res) => {
    res.send('display a form for creating a new map');
  })

  router.get("/profile", (req, res) => {
    res.send("Show profile page of logged in user");
  })

  router.get("/:map_id", (req, res) => {
    res.send(`show the map ${req.params.map_id}`);
  })

  router.delete("/:map_id", (req, res) => {
    res.send(`delete the map ${req.params.map_id}`);
  })

  return router;
};
