// const express = require('express');
// const cors = require('cors');
// const BooksRatingController = require("./RouteController/BooksRatingController");
// const ContactUsController = require("./RouteController/ContactUsController");
import express from 'express';
import cors from 'cors';
import BooksRatingController from "./RouteController/BooksRatingController.js";
import ContactUsController from "./RouteController/ContactUsController.js";


 const app = express();
app.use(express.json());
 app.use(cors());
 

// Smoke Test Api
app.get("/bookSmokeTest", async (req, resp) => {
    resp.send("Smoke Test Successful for Book Rating Project")
})

app.use((req, resp, next) => {
    resp.setHeader('Access-Control-Allow-Origin', '*')
    resp.setHeader('Access-Control-Allow-Headers', '*')
    next();
})
// Books Routs
app.use('/books/api/v1', BooksRatingController);
// Contact Routes
app.use("/contact/api/v1", ContactUsController)

app.listen(1000, () => {
    console.log("Node Served Started");
})