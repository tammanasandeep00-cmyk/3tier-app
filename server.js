require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000
});

connection.connect((err) => {

    if (err) {

        console.error("Database Connection Failed");
        console.error(err);

        process.exit(1);

    }

    console.log("Connected to MySQL Database");

});

// Home Route

app.get("/", (req, res) => {

    res.send("Recipe Backend Running Successfully");

});

// Health Check

app.get("/health", (req, res) => {

    res.json({

        status: "UP",
        application: "Recipe Backend",
        database: "Connected"

    });

});

// Fetch Recipes

app.get("/api/recipes", (req, res) => {

    connection.query("SELECT * FROM recipes", (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({

                success: false,
                message: "Database Error"

            });

        }

        res.status(200).json(results);

    });

});

app.listen(PORT, () => {

    console.log(`Backend Server Started`);
    console.log(`Running on Port ${PORT}`);

});
