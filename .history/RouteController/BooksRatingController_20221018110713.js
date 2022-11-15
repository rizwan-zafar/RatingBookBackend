const express = require("express");
const DataStore = require("nedb");
const route = express.Router();

const booksRating_db = new DataStore({ filename: "Database/booksRating.db", autoload: true })

//get list of rated books from db
route.get('/', async (req, resp) => {
    try {
        await booksRating_db.find({}, (err, loadedData) => {
            if (err) {
                return resp.status(500).json({ message: "Error " + err })
            }
            if (loadedData == "") {
                resp.send({ message: "Data not Found", data: loadedData });
            }
            resp.send({ message: "Data Found Successfully", data: loadedData });
        })
    }
    catch (err) {
        return resp.status(500).json({ message: "Error " + err })
    }
})


route.post('/', async (req, resp) => {
    try {
        await booksRating_db.insert({name:"Rizwan"}, (err, insertedData) => {
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

module.exports = route;