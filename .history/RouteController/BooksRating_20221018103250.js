const express=require("express");
const route=express.Router();


route.get('/',async(req,resp)=>{
    resp.send("working fine for port 1000");
})

module.exports=route;