require("dotenv").config();

const express = require("express");
const { connectToDB } = require("./config/db");
var cors = require("cors");
const pg = require("pg");
const app = express();

app.use(cors()); // allowing all domains to hit your endpoints

// const client = new pg.Client(process.env.DATABASE_URL);
// const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Routing

async function startServer() {
  try {
    await connectToDB();
    console.log("Database connected, starting server...");
    const homepage = require("./routes/home");
    const postRoute = require("./routes/posts");
    const sqlCrud = require("./routes/sqlcrud");
    const auth = require("./routes/auth");

    app.use("/", homepage);
    app.use("/test", postRoute);
    app.use("/pets", sqlCrud);
    app.use("/user", auth);

    //-----------------------------------------------------

    // 404 handler
    app.use((req, res) => {
      res.status(404).send("Page not found <a href='/'>Get back home</a>");
    });

    //-----------------------------------------------------
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`app listening on port http://localhost:${port}`);
    });
  } catch (error) {}
}
startServer();

// pool
//   .connect()
//   .then(() => {

//   })
//   .catch((err) => {
//     console.error("Could not connect to database:", err);
//   });

// pool
//   .connect()
//   .then((client) => {
//     return client
//       .query("SELECT current_database(), current_user")
//       .then((res) => {
//         client.release();

//         const dbName = res.rows[0].current_database;
//         const dbUser = res.rows[0].current_user;

//         console.log(
//           `Connected to PostgreSQL as user '${dbUser}' on database '${dbName}'`
//         );

//         console.log(`App listening on port http://localhost:${port}`);
//       });
//   })
//   .then(() => {
//     app.listen(port);
//   })
//   .catch((err) => {
//     console.error("Could not connect to database:", err);
//   });
