const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// create register  (POST)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // hash the password
    const hashedpassword = await bcrypt.hash(password, 10); // 1024 encrypt times
    // less number means less time but less secure
    // large number means more proccing time but more secure // 10 is default

    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
      [username, hashedpassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("error inserting", error);
    if (error.code === "23505") {
      res.status(409).send("username already exsist");
    }
    res.status(500).send("Error", error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    const user = userResult.rows[0];
    if (!user) return res.status(404).send("username not found");

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(401).send("invalid Credentials");

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.send({ token });
  } catch (error) {
    console.log("error logging in", error);

    res.status(500).send("Error", error.message);
  }
});

module.exports = router;
