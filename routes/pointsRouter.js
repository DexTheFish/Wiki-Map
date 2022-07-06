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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // router.use((req, res, next) => {
  //   if (!req.cookies.userId) {
  //     return res.redirect('/login');
  //   }
  //  next();
  // });
=======
=======
>>>>>>> Stashed changes
  router.use((req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/users/login');
    }
   next();
  });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  //GET new point form
  router.get("/new", (req, res) => {
    //  if logged in
    //    show form for create new point
    // if logged out
    //  redirect home? login?
    // res.send("I am a new point form");

    const templateVars = { // fake user
      id: req.session.userId,
      name: req.session.name,
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
      return res.redirect(`/maps/${map_id}`);
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
    const queryString = `
    SELECT *
    FROM points
    WHERE id = $1
    `;

    db.query(queryString,[req.params.point_id])
    .then((results) => {
      const templateVars = {
        id: req.session.userId,
        name: req.session.name,
        point: results.rows[0]
      }
      console.log(results.rows);
      return res.render("points_show", templateVars);
    })
    .catch((err) => {
      return res.status(500).json({error: err.message});
    })
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
      const id = req.session.userId; //replace with id from cookie
      const name = req.session.name;  // replace with name from cookie
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
