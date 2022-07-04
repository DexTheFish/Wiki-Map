/*
 * All routes for points are defined here
 * Since this file is loaded in server.js into api/points,
 *   these routes are mounted onto /points
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

    //POST a new point 
    router.post("/new", (req, res) => {
      res.send(`Add a new point`);
    });
  
    //EDIT an existing point 
    router.post("/id/edit", (req, res) => {
      res.send(`Edit an existing point`);
    });

    //DELETE an existing point 
    router.post("/id/delete", (req, res) => {
      res.send(`Delete an existing point`);
    });


  //GET all points information
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM points;`) //query the DB for all the points
      .then(data => {
        const points = data.rows;
        res.json({ points }); // send all the points to the browser as a JSON object (?)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //GET point information by ID
  router.get("/:id", (req, res) => {
    console.log(req.params);
    db.query(`SELECT * FROM points WHERE id = ${req.params.id};`) 
      .then(data => {
        const points = data.rows;
        res.json({ points }); 
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;


};
