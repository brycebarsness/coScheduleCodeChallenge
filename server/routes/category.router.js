const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM category ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});
router.put(`/:id`, (req, res) => {
  let queryText = `UPDATE "favorites" SET "category_id" = $1 WHERE "id" = $2`;
  console.log(req.body, req.params);

  pool
    .query(queryText, [req.body.category, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
