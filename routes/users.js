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

  router.post("/", (req, res) => {
    res.send("You have created a new User");
  });

  router.get("/register", (req, res) => {
    const templateVars = { // fake user
      id: 1,
      name: "Abi",
      email: "a@example.ca",
      password: "password"
      };
      const templateVars2 = {
        id: null,
      name: "",
      email: "",
      }
    res.render("users_register", templateVars2);
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
