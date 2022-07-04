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
    // grab all maps
    // render maps_home
    // if logged in option to add map (html side)
    res.send("show all active maps ABII");
  });

  router.post("/", (req, res) => {
    // only if logged in
    //    create map object
    //    save to db
    //    redirect /:map_id
    // if not logged in
    //    redirect /users/login
    res.send('Create a new map');
  })

  router.get("/new", (req, res) => {
    // if logged in
    //    render page with form for new
    res.send('display a form for creating a new map');
  })

  router.get("/profile", (req, res) => {
  // this is in /maps because the queries will look like SELECT * FROM maps
  // if logged in query faves, query contribution maps, all??
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
