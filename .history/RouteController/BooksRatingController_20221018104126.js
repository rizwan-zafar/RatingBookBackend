const express=require("express");
const DataStore=require("nedb");
const route=express.Router();

const booksRating_db=new DataStore({filename:"Database/booksRating", autoload:true})


route.get('/',async(req,resp)=>{
    resp.send("working fine for port 1000");
})

module.exports=route;