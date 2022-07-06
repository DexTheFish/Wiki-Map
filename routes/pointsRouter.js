/*
 * All routes for points are defined here
 * Since this file is loaded in server.js into api/points,
 *   these routes are mounted onto /points
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //check for login in router, only need to be done once
  // router.use((req, res, next) => {
  //   if (!req.cookies.user_id) {
  //     return res.redirect('/login');
  //   }
  //  next();
  // });

  //GET new point form
  router.get("/new", (req, res) => {
    //  if logged in
    //    show form for create new point
    // if logged out
    //  redirect home? login?
    // res.send("I am a new point form");

    const templateVars = { // fake user
      id: 1,
      name: "Abi",
      email: "a@example.ca",
      password: "password"
      };
    return res.render("points_new", templateVars);
  })

  //POST create a new point
  router.post("/new", (req, res) => {
    //if logged in
    //  create point object
    //  save to db (later)
    //if logged out
    // redirect home? login?
    const latitude = 0;
    const longitude = 0;
    const map_id = 1;
    const [name, description, img_url] = [req.body.name, req.body.description, req.body.img_url];
    const queryString = `
    INSERT INTO points 
    (name, description, img_url, longitude, latitude, map_id)
    VALUES 
    ( $1, $2, $3, ${longitude}, ${latitude}, ${map_id} ) 
    RETURNING *`
    console.log(img_url);
    db.query(queryString, [name, description, img_url])
    .then(data => {
      // redirect home? login?
      return res.redirect(`/maps/:${map_id}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //GET point by ID
  router.get("/:point_id", (req, res) => {
    // query db with point_id
    // render details about point
    const templateVars = {
      id: req.session.userId,
      name: 'bob',
      point: {
        "id": 1,
        "name": "Epic Location 1",
        "description": "best spot in the whole city!",
        "img_url": "https://i.imgur.com/V6UPvSu.jpeg",
        "longitude": "-79.38",
        "latitude": "43.65",
        "active": true,
        "map_id": 1
      }
    };
    return res.render("points_show", templateVars);
  });


  //GET point edit form by ID
  router.get("/:point_id/edit", (req, res) => {
    // use point_id to query for name, description, img_url
    // put them into templateVars
    const point_id = req.params.point_id;
    const queryString = (`
    SELECT name, description, img_url
    FROM points
    WHERE id = ${point_id};`)
    db.query(queryString)
    .then(data => {
      const point_name = data.rows[0].name;
      const description = data.rows[0].description;
      const img_url = data.rows[0].img_url;
      const id = 1; //replace with id from cookie
      const name = 'bob';  // replace with name from cookie
      const templateVars = { id, name, point_id, point_name, description, img_url };
      return res.render("points_edit", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST edit point by ID
  router.post("/:point_id/edit", (req, res) => {
    // STRETCH: require authorization by checking user cookie
    const [name, description, img_url] = [req.body.name, req.body.description, req.body.img_url];
    const point_id = req.params.point_id;
    let queryString = `
    UPDATE points
    SET name = $1,
    description = $2,
    img_url = $3
    WHERE id = ${point_id}`
    db.query(queryString, [name, description, img_url])
    .then(data => {
      return res.redirect("back");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST delete point by ID
  router.post("/:point_id/delete", (req, res) => {
    // if logged in:
    //  SELECT point from db
    //  set active = FALSE
    //  redirect to somewhere
    // if not logged in:
    //  complain
    //  redirect to home? login?
    const point_id = req.params.point_id;
    const queryString = `
    UPDATE points
    SET active = false
    WHERE id = ${point_id}`
    console.log(queryString)
    db.query(queryString)
    .then(data => {
      return res.redirect("back");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
