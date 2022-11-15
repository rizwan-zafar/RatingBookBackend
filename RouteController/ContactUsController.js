import express from "express";
import DataStore  from "nedb";
// const express = require("express");
// const DataStore = require("nedb");
const route = express.Router();
const ContactUs_db = new DataStore({ filename: "Database/Contact.db", autoload: true })



route.get('/',async (req,resp)=>{
    resp.send("working fine for Contact");
})
   /**
     * *Post Message
     * *EndPoint: /books/api/v1
     * @params request.body
     * @return inserted Data
     */
    route.post('/', async (req, resp) => {
        console.log("test",req.body)
        try {
            await ContactUs_db.insert(req.body, (err, insertedData) => {
                if (err) {
                    return resp.status(500).json({ message: "Error " + err })
                }
                resp.send(insertedData);
            })
        }
        catch (err) {
            return resp.status(500).json({ message: "Error " + err })

        }
    })

    export default route;