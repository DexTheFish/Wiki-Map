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
    if(req.session.userId){
    //need to add database query but first must update db schema
    const templateVars = {
      name: "bob",
      id: 1,
      faves: [{
        id: 1,
        name: "Abigails amazing attractions",
        description: "these are all the amazing spots that I recommend. Hope to see you there!",
        active: true,
        creator_id: 1
      }, {
        "id": 1,
        "name": "Abigails amazing attractions",
        "description": "these are all the amazing spots that I recommend. Hope to see you there!",
        "active": true,
        "creator_id": 1
      }],
      contributions: null
    };
    return res.render("maps_profile", templateVars);
    }
    return res.redirect("/maps");
  });

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
