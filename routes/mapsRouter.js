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
      const templateVars = { maps: data.rows, id: req.session.id, name: 'bob' };
      return res.render("maps_index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

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

  //GET new map form
  router.get("/new", (req, res) => {
    // if logged in
    //    render page with form for new
    if(req.session.userId) {
      const templateVars = {
        id: req.session.userId,
        name: req.session.name
      }
      return res.render("maps_new", templateVars);
    }
    return res.redirect("/maps");
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

  //GET subset of user's maps
  router.get("/profile", (req, res) => {
  // this is in /maps because the queries will look like SELECT * FROM maps
  // if logged in query faves, query contribution maps, all??
  const queryString = `
  SELECT maps.name, maps.description, maps.id
  FROM maps
  JOIN favourite_maps on map_id = maps.id
  WHERE user_id = $1 AND maps.active = TRUE
  `;
  const queryString2 = `
  SELECT maps.name, maps.description, maps.id
  FROM maps
  JOIN points ON points.map_id = maps.id
  JOIN contributions on  contributions.point_id = points.id
  WHERE contributions.user_id = $1 AND maps.active = TRUE
  `
  let templateVars = {
    id: req.session.userId,
    name: req.session.name,
  }

  db.query(queryString, [req.session.userId])
  .then((results) => {
    templateVars["faves"] = results.rows;
    console.log(templateVars.faves[0]);

    return db.query(queryString2, [req.session.userId]);
  })
  .then((results) => {
    templateVars.contributions = results.rows;

    return res.render("maps_profile", templateVars);
  })
  .catch((err) => {
    console.log(err.message);
  })
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
      const [map_id, map_name, description, creator_name] = [map.rows[0].id, map.rows[0].name,map.rows[0].description, map.rows[0].creator_name];
      const id = 1; //temp for template vars
      const name = 'bob'; //temp for template vars
      const templateVars = { id, name, map_id, map_name, description, creator_name };
      return res.render("maps_show", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //GET map edit form by ID
  router.get("/:map_id/edit", (req, res) => {
    const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON maps.creator_id = users.id
    WHERE maps.id = ${req.params.map_id}`
    db.query(queryString)
    .then(map => {
      const [map_id, map_name, description, creator_name] = [map.rows[0].id, map.rows[0].name,map.rows[0].description, map.rows[0].creator_name];
      const id = 1; //temp for template vars
      const name = 'bob'; //temp for template vars
      const templateVars = { id, name, map_id, map_name, description, creator_name };
      return res.render("maps_edit", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST edit map by id
  router.post("/:map_id/edit", (req, res) => {
    const [name, description] = [req.body.name, req.body.description];
    const map_id = req.params.map_id;
    const queryString = `
    UPDATE maps
    SET name = $1,
    description = $2
    WHERE id = ${map_id}`
    db.query(queryString, [name, description])
    .then(data => {
      return res.redirect(`/maps/${req.params.map_id}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST delete map by ID
  router.post("/:map_id/delete", (req, res) => {
    const map_id = req.params.map_id;
    const queryString = `
    UPDATE maps
    SET active = false
    WHERE id = ${map_id}`
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
  router.post("/:map_id/favs", (req, res) => {
    //query to add to favourites table
    res.redirect('back');
  })

  //POST edit by id
  router.post("/:map_id/edit", (req, res) => {
    //query to change the map's name, description, ...
    res.redirect(`/maps/${req.params.map_id}`);
  })

  //POST add a map to user's favourites

  //POST remove a map from user's favourites

return router;
};

