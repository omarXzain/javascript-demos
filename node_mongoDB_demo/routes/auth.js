const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getDB } = require("../config/db");
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const routeGuard = require("../middleware/verifyToken");

router.get("/secret", routeGuard, async (req, res) => {
  res.send("Hello, this is a protected route");
});

// create register  (POST)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = getDB();
    const userExists = await db.collection("users").findOne({ username });
    if (userExists) return res.status(409).send("Username already exists");

    // hash the password
    const hashedpassword = await bcrypt.hash(password, 10); // 1024 encrypt times
    const newUser = { username, password: hashedpassword };
    const result = await db.collection("users").insertOne(newUser);
    console.log("results for user", result);

    res.status(201).json({ id: result.insertedId, username });
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
    const db = getDB();
    const user = await db.collection("users").findOne({ username });
    if (!user) return res.status(404).send("username not found");

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(401).send("invalid Credentials");
    console.log("user result in login ", user);

    // step 1
    const token = jwt.sign(
      { id: user._id, username: user.username },
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
