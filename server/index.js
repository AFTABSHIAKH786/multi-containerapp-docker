const express = require("express");
const { Client } = require("pg");

const app = express();
app.use(express.json());


const clientConfig = {
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "testdb"
};

let client;

const tryConnect = () => {
  client = new Client(clientConfig);
  client.connect()
    .then(() => {
      console.log("Connected to Postgres");

      return client.query(`
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255)
        );
      `);
    })
    .then(() => console.log("Table ready"))
    .catch(err => {
      console.error("Connection error, retrying in 5 seconds...", err.message);
      setTimeout(tryConnect, 5000);
    });
};

tryConnect();


// POST /books → Add a new book
app.post("/books", async (req, res) => {
  const { title } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO books (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting book");
  }
});

// GET /books → Get all books
app.get("/books", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

app.get("/", (req,res) => {
  res.send("Service is running")
})

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
