const express=require('express');
const app=express();
const BooksRatingController=require("./RouteController/BooksRatingController");

app.get("/bookSmokeTest",async(req,resp)=>{
    resp.send("Smoke Test Successfull for Book Rating Project")
})

app.use('/books/api/v1',BooksRatingController);

app.listen(1000,()=>{
    console.log("Node Served Started");
})