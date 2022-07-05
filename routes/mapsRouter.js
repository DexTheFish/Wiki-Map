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
    // if logged in option to add map (html side)
    const queryString = `SELECT * FROM maps LIMIT 5;`
    db.query(queryString)
    .then(data => {
      const templateVars = { maps: data.rows };
      return res.render("maps_index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST create a new map
  router.post("/", (req, res) => {
    //STRETCH: use cookies to adjust creator_id
    //STRETCH: use cookies to authorize map creation
    //STRETCH: protect against SQL Injection
    const name = req.body.name;
    const description = req.body.description;
    const creator_id = 1; // use cookies to adjust
    db.query(`INSERT INTO maps
    (name, description, creator_id)
    VALUES ('${name}', '${description}', '${creator_id}') RETURNING *;`)
    .then(data => {
      console.log(data.rows[0]);
      return res.send("you made a map"); // should instead redirect to /:map_id
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  //GET new map form
  router.get("/new", (req, res) => {
    // if logged in
    //    render page with form for new
    res.send('display a form for creating a new map');
  })

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
