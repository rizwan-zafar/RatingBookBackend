const express=require("express");
const DataStore=require("nedb");
const route=express.Router();

const booksRating_db=new DataStore({filename:"Database/booksRating.db", autoload:true})


route.get('/',async(req,resp)=>{
    try{

    }
    catch(err)
    {
        return resp.status(500).json({message:"Error "+err})
    }
})

module.exports=route;