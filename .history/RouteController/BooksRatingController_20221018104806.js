const express=require("express");
const DataStore=require("nedb");
const route=express.Router();

const booksRating_db=new DataStore({filename:"Database/booksRating.db", autoload:true})


route.get('/',async(req,resp)=>{
    try{
        await booksRating_db.find({},async(err,loadedData)=>{
            if(err)
            {
                return resp.status(500).json({message:"Error "+err})
            }
            if(loadedData=="")
            {
                resp.send({message:"Data not Found",data:loadedData});
            }
            resp.send(loadedData);
        })
    }
    catch(err)
    {
        return resp.status(500).json({message:"Error "+err})
    }
})

module.exports=route;