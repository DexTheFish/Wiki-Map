/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //example route provided in skeleton
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`) //query the DB for all the users
      .then(data => {
        const users = data.rows;
        res.json({ users }); // send all the users to the browser as a JSON object
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/register", (req, res) => {
    res.send("Registration Page");
  });

  router.get("/login", (req, res) => {
    res.send("Login Page");
  });

  router.post("/login", (req, res) => {
    res.send("You have successfully logged in!");
  });

  router.post("/logout", (req, res) => {
    res.send("You have successfully logged out!");
  });

  return router;
};
