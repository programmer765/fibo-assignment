import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
dotenv.config();

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  port: 3306,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.NAME,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
    const table =
      "CREATE TABLE IF NOT EXISTS contacts (id MEDIUMINT NOT NULL AUTO_INCREMENT, name VARCHAR(255), gender VARCHAR(255), email VARCHAR(255), mobile_number VARCHAR(12), PRIMARY KEY (id))";
    connection.query(table, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Created");
      }
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/contact/create", (req, res) => {
  const data = req.body;
  const operation = `insert into contacts (name, gender, email, mobile_number) values ('${data.name}', '${data.gender}', '${data.email}', '${data.mobile_number}')`;
  connection.query(operation, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ status: 200, data: response.insertId });
    }
  });
});

app.get("/contact/get", (req, res) => {
  const data = req.body;
  const operation = `select * from contacts where id = '${data.id}'`;
  connection.query(operation, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ status: 200, data: response });
    }
  });
});

app.patch("/contact/update", (req, res) => {
  const data = req.body;
  const operation = `update contacts set email = '${data.email}', mobile_number = '${data.mobile_number}' where id = '${data.id}'`;
  connection.query(operation, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ status: 200, data: response });
    }
  });
});

app.delete("/contact/delete", (req, res) => {
  const data = req.body;
  const operation = `delete from contacts where id = '${data.id}'`;
  connection.query(operation, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ status: 200, data: "Success" });
    }
  });
});

app.listen(8000, () => {
  console.log("Server is running");
});
