const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "campaignGroup",
});

app.use(cors());
app.use(express.json());

app.post("/create", (req, res) => {
    const name = req.body.name;
    const keywords = req.body.keywords;
    const amount = req.body.amount;
    const funds = req.body.funds;
    const status = req.body.status;
    const town = req.body.town;
    const radius = req.body.radius;

    db.query(
        "INSERT INTO campaigns (name, keywords, amount, funds, status, town, radius) VALUES (?,?,?,?,?,?,?)",
        [name, keywords, amount, funds, status, town, radius],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values saved correctly");
            }
        }
    );
});

app.get("/campaigns", (req, res) => {
    db.query("SELECT * FROM campaigns", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const keywords = req.body.keywords;
    const amount = req.body.amount;
    const funds = req.body.funds;
    const status = req.body.status;
    const town = req.body.town;
    const radius = req.body.radius;

    db.query(
        "UPDATE campaigns SET (name, keywords, amount, funds, status, town, radius) VALUES (?,?,?,?,?,?,?) WHERE id = ?",
        [name, keywords, amount, funds, status, town, radius],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM campaigns WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(4000);
