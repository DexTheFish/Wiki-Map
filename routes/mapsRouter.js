/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

//GET all active maps
  router.get("/", (req, res) => {
    // grab all maps
    // render maps_home
    // if logged in option to add map (html side)
    res.send("show all active maps ABII");
  });

  //POST create a new map
  router.post("/", (req, res) => {
    // only if logged in
    //    create map object
    //    save to db
    //    redirect /:map_id
    // if not logged in
    //    redirect /users/login
    res.send('Create a new map');
  })

  //GET new map form
  router.get("/new", (req, res) => {
    // if logged in
    //    render page with form for new
    if(req.session.userId) {
      const templateVars = {
        id: req.session.userId,
        name: "bob" //hardcoding name for now
      }
      return res.render("maps_new", templateVars);
    }
    return res.redirect("/maps");
  });

  //GET subset of user's maps
  router.get("/profile", (req, res) => {
  // this is in /maps because the queries will look like SELECT * FROM maps
  // if logged in query faves, query contribution maps, all??
    res.send("Show profile page of logged in user");
  })

  //GET map by ID
  router.get("/:map_id", (req, res) => {
    res.send(`show the map ${req.params.map_id}`);
  })

  //POST delete map by ID
  router.post("/:map_id", (req, res) => {
    res.send(`delete the map ${req.params.map_id}`);
  })

  return router;
};
