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
    const queryString = `
    SELECT * FROM maps
    WHERE active = true`
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
    const [name, description] = [req.body.name, req.body.description];
    const creator_id = 1; // use cookies to adjust
    const queryString = `
    INSERT INTO maps
    (name, description, creator_id)
    VALUES
    ($1, $2, ${creator_id} )
    RETURNING *`
    db.query(queryString, [name, description])
    .then(data => {
      return res.redirect("/maps");
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
    const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON maps.creator_id = users.id
    WHERE maps.id = ${req.params.map_id}`
    db.query(queryString)
    .then(map => {
      const map_id = map.rows[0].id; //replace with id from cookie
      const map_name = map.rows[0].name;
      const description = map.rows[0].description;
      const img_url = map.rows[0].img_url;
      const creator_name = map.rows[0].creator_name;
      const id = 1;
      const name = 'bob';
      const templateVars = { id, name, map_id, map_name, description, img_url, creator_name };
      return res.render("maps_show", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST delete map by ID
  router.post("/:map_id/delete", (req, res) => {
    const queryString = `
    UPDATE maps
    SET active = false
    WHERE id = ${req.params.map_id}`
    db.query(queryString)
    .then(map => {
      console.log(queryString)
      return res.redirect("/maps");
    })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
    });
  });

  //POST add favourite map
  router.post("/:map_id/favourites", (req, res) => {
    //query to add to favourites table
    res.redirect('back');
  })

  //POST edit by id
  router.post("/:map_id/edit", (req, res) => {
    //query to change the map's name, description, ...
    res.redirect(`/maps/${req.params.map_id}`);
  })

return router;
};

