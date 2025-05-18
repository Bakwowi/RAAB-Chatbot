const express = require("express");
const cors = require("cors");

const app = express();
express.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
}));