/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const bcrypt = require('bcrypt');

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

  //POST create a new user
  router.post("/", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    console.log(user);
    //insert new user into db --> later when we do db stuff
    //set session id to new user id ---> req.session.userId = user.id
    res.redirect("/maps");
  });

  // GET new user form
  router.get("/register", (req, res) => {
    // if logged in:
    //   redirect home
    // if not logged in:
    //   render the registration form
    const templateVars = { // fake user
      id: 1,
      name: "Abi",
      email: "a@example.ca",
      password: "password"
      };

    res.render("users_register", templateVars);
  });

  router.get("/login", (req, res) => {
    // if logged in:
    //   redirect home
    // if not logged in:
    //   render the login form
    res.send("Login Page");
  });

  router.post("/login", (req, res) => {
    // STRETCH: User Authentication
    // use the req.body to query the db
    // if a user matches the info:
    //   set cookie <-> id
    //   redirect home
    // if no match:
    //   redirect to login
    //   error handling - client side, worry later
    res.send("You have successfully logged in!");
  });

  router.get("/login/:user_id", (req, res) => {
    // MVP: bypass user authentication
    // set the cookie id to user_id like below:
    // req.session.userId = req.params.user_id
    // redirect home (profile?)
    res.send(`u r now logged in as ${req.body.user_id}`)
  })

  router.post("/logout", (req, res) => {
    // if logged in
    //  clear cookie
    // if not
    //  redirect home
    res.send("You have successfully logged out!");
  });

  return router;
};
