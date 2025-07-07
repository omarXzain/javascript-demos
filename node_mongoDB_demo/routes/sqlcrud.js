const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const routeGuard = require("../middleware/verifyToken");

// show all table data
router.get("/showAll", routeGuard, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pets");
    res.json(result.rows);
  } catch (error) {
    console.log("error showing the data", error);

    res.status(500).send("Error fetching");
  }
});

// insert data into the table
router.post("/insert", async (req, res) => {
  const { name, type, age, owned } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pets (name, type, age, owned) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, type, age, owned]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("error inserting", error);
    res.status(500).send("Error");
  }
});

// update pets values
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type, age, owned } = req.body;

  try {
    const result = await pool.query(
      "UPDATE pets SET name=$1, type=$2, age=$3, owned=$4 WHERE id=$5 RETURNING *",
      [name, type, age, owned, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
