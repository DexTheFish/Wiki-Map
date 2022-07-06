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

  let templateVars = {
    id: null,
    name: null
  };

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
      req.session.name = results.rows[0].name;

      templateVars.id = req.session.userId;
      templateVars.name = req.session.name;
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

    res.render("users_register", templateVars);
  });

  router.get("/login", (req, res) => {
    console.log(templateVars);
    if(req.session.userId){
      return res.redirect("/maps");
    }
    res.render("users_login.ejs", templateVars);
  });

  router.post("/login", (req, res) => {
    req.session = null;

    // for now we will not verify the password
    // STRETCH: User Authentication
    //  use the req.body to query the db
    //  if a user matches the info:
    //    set cookie <-> id
    //    redirect home
    //  if no match:
    //    redirect to login
    //    show angry message
    const email = req.body.email;
    res.redirect("/maps");
  });

  router.get("/login/:user_id", (req, res) => {
    // MVP: bypass user authentication
    // set the cookie id to user_id like below:
    // req.session.userId = req.params.user_id
    // redirect home (profile?)
    const queryString = `
    SELECT name
    FROM users
    WHERE id = $1
    `;
    db.query(queryString, [req.params.user_id])
    .then((results) => {
      req.session.userId = req.params.user_id; //set cookie userId
      req.session.name = results.rows[0]; //set cookie name
      //update templateVars
      templateVars.id = req.session.userId;
      templateVars.name = req.session.name;

      console.log(req.session.name);
      res.redirect("/maps/profile");
    })
    .catch(err=>res.send(err.message));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    templateVars.id = null;
    templateVars.name = null;
    res.redirect("/maps");
  });

  return router;
};
