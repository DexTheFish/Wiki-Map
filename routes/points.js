/*
 * All routes for points are defined here
 * Since this file is loaded in server.js into api/points,
 *   these routes are mounted onto /points
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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
  return router;
};
