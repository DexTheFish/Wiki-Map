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
  router.get("/:points_id/edit", (req, res) => {
    // if logged in
    // render edit form page
    // if logged out
    // redirect home? login?
    res.send("go form go");
  })

  //POST point edit form
  router.post("/:point_id/edit", (req, res) => {
  //if logged in
  //  set previous record as inactive
  //  create new points object and copy unchanged info from previous record
  //  save "edit" of desc/image/title in new points object
  //  insert new point with updated attributes into db
  //if logged out
  //  redirect home? login?
    res.send(`Edit an existing point`);
  });

  //DELETE an existing point
  router.post("/:point_id/delete", (req, res) => {
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
