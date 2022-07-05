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
    const queryString = `
    SELECT * 
    FROM users` //query the DB for all the users
    db.query(queryString)
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

    const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`
    db.query(queryString, [user.name, user.email, user.password])
    .then((results) => {
      if(!results) {
        res.send({error: "error adding user"});
        return;
      }
      console.log(results.rows[0]);
      req.session.userId = results.rows[0].id;
      res.redirect("/maps");
    })
    .catch((err) => {
      console.log(err.message);
      res.send(err.message);
    });
  });

  // GET new user form
  router.get("/register", (req, res) => {
    // if logged in:
    //   redirect home
    // if not logged in:
    //   render the registration form
    // if(req.session.userId) {
    //   console.log(req.session);
    //   return res.redirect("/maps");
    // }
    if(req.session.userId) {
      console.log(req.session.userId);
      return res.redirect("/maps");
    }
    const templateVars = { // fake user
      id: null,
      name: null,
      email: null,
      password: null
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
    req.session = null;
    res.redirect("/users/register"); // CHANGE TO LOGIN once the login endpoints are connected to users_login.ejs
  });

  return router;
};
