const express = require('express');
 const app = express();
app.use(express.json());
const cors = require('cors');
 app.use(cors());
const BooksRatingController = require("./RouteController/BooksRatingController");
const ContactUsController = require("./RouteController/ContactUsController");
 

// Smoke Test Api
app.get("/bookSmokeTest", async (req, resp) => {
    resp.send("Smoke Test Successful for Book Rating Project")
})

// Books Routs
app.use('/books/api/v1', BooksRatingController);
// Contact Routes
app.use("/contact/api/v1", ContactUsController)

app.listen(1000, () => {
    console.log("Node Served Started");
})