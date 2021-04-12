const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM favorites`;
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  const gifToAdd = req.body;
  console.log(`Adding new favorite`, gifToAdd);
  let queryText = `INSERT INTO "favorites" ("url", "title", "category_id", "comments") VALUES ($1, $2, $3, $4)`;
  pool
    .query(queryText, [
      gifToAdd.images.downsized_medium.url,
      gifToAdd.title,
      gifToAdd.category_id,
      gifToAdd.comments,
    ])
    .then((result) => {
      console.log("added gif to the favorite table");
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error adding gif to favorite table", error);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
// router.put("/:favId", (req, res) => {
//   const gifToChange = req.body;
//   console.log(`changing new favorite to category`, favID);
//   let queryText = `INSERT INTO "favorites" ("url", "title", "category_id", "comments") VALUES ($1, $2, ${favID}, $3)`;
//   pool
//     .query(queryText, [
//       gifToChange.images.downsized_medium.url,
//       gifToChange.title,
//       gifToChange.comments,
//     ])
//     .then((result) => {
//       console.log("changing git category to", favID);
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log("error changing git category", error);
//       res.sendStatus(500);
//     });
// });

// delete a favorite
router.delete("/:id", (req, res) => {
  console.log(`deleting gif with id ${req.params.id}`);
  queryText = `DELETE FROM favorites WHERE id=${req.params.id}`;
  pool
    .query(queryText)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
