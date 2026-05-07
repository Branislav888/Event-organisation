const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_BASE = "http://localhost:9080";

app.get("/contracts", async (req, res) => {
    try {

        const response = await fetch(`${API_BASE}/customers-contracts/v2/de_studentui/contracts`);
        const data = await response.json();

        console.log("CELÉ DATA:");
        console.log(data);

        res.json(data); 

    } catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});