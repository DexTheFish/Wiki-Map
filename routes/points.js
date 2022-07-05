/*
 * All routes for points are defined here
 * Since this file is loaded in server.js into api/points,
 *   these routes are mounted onto /points
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //GET a new point form
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
    res.render("points_new", templateVars);
  })

  //POST a new point
  router.post("/new", (req, res) => {
    //if logged in
    //  create point object
    //  save to db (later)
    //if logged out
    // redirect home? login?

    res.send(`Add a new point`);
  });

  //GET point edit form
  router.get("/:point_id/edit", (req, res) => {
    // use point_id to query for name, description, img_url
    // put them into templateVars
    const point_id = req.params.point_id;
    db.query(`SELECT name, description, img_url
    FROM points
    WHERE id = ${point_id};`)
    .then(data => {
      const point_name = data.rows[0].name;
      const description = data.rows[0].description;
      const img_url = data.rows[0].img_url;
      const id = 1; //replace with id from cookie
      const name = 'bob';  // replace with name from cookie
      const templateVars = { id, name, point_id, point_name, description, img_url };
      return res.render("points_show", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //POST point edit form
  router.post("/:point_id/edit", (req, res) => {
    // STRETCH: require authorization by checking user cookie
    // STRETCH: protect against SQL Injection
    const [name, description, img_url] = [req.body.name, req.body.description, req.body.img_url];
    const point_id = req.params.point_id;
    db.query(`UPDATE points
    SET name = '${name}',
    description = '${description}',
    img_url = '${img_url}'
    WHERE id = ${point_id};`)
    .then(data => {
      // redirect home? login?
      res.redirect("back");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //DELETE an existing point
  router.delete("/:point_id/delete", (req, res) => {
    // if logged in:
    //  SELECT point from db
    //  set active = FALSE
    //  redirect to somewhere
    // if not logged in:
    //  complain
    //  redirect to home? login?
    res.send(`Delete an existing point`);
  });

  //GET point information by ID
  router.get("/:point_id", (req, res) => {
    // query db with point_id
    // render details about point
    res.send("i am a point");
 });


  return router;
};
