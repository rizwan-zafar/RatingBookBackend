const express = require("express");
const DataStore = require("nedb");
const route = express.Router();

const booksRating_db = new DataStore({ filename: "Database/booksRating.db", autoload: true })

 
    /**
     * *Get All Books api
     * *EndPoint: /books/api/v1
     * @returns allbooks
     */
route.get('/', async (req, resp) => {
    try {
        await booksRating_db.find({}, (err, loadedData) => {
            if (err) {
                return resp.status(500).json({ message: "Error " + err })
            }
            if (loadedData == "") {
                resp.status(404).json({ message: "Record not Found" })
            }
            resp.send({ message: "Data Found Successfully", data: loadedData });
        })
    }
    catch (err) {
        return resp.status(500).json({ message: "Error " + err })
    }
})


 
    /**
     * *Post new rated book api
     * *EndPoint: /books/api/v1
     * @params request.body
     * @return inserted Data
     */
route.post('/', async (req, resp) => {
   try {
        await booksRating_db.insert(req.body, (err, insertedData) => {
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


 
 /**
     * *Update rated book
     * *EndPoint: /books/api/v1
     * @params request.id
     * @parms request.body
     * @return confirm msg
     */
route.put('/:id', (req, resp) => {
    console.log("id in db",req.params.id)
    console.log("data of body for db",req   .body)
    try {
        booksRating_db.update({ _id: req.params.id }, req.body, { upsert: false }, (err, updatedData) => {
            if (err) {
                resp.status(500).json({ message: "Error" + e });
            }
            else if (updatedData) {
                return resp.json({ message: "Books Rating Updated Successfully", data:updatedData })
            }
            else {
                return resp.json({ message: "No Record Match" })
            }
        })
    }
    catch (e) {
        resp.status(500).json({ message: "Error" + e });

    }

})

// Get single book by id
// Endpoind: /books/api/v1
/**
     * *Search Single Book 
     * *EndPoint: /books/api/v1
     * @params request.params.id
     * @return Searched Record
     */
route.get('/:id', async (req, resp) => {
    try {
        await booksRating_db.findOne({ _id: req.params.id }, (err, singleData) => {
            if (err) {
                return resp.status(500).json({ message: "Error " + err })
            }
            if (singleData == null) {

                return resp.status(404).json({ message: "Record not Found" })

            }
            resp.send({ message: "Data Found Successfully", data: singleData });
        })
    }
    catch (err) {
        return resp.status(500).json({ message: "Error " + err })
    }
})


// Delete Book from Database
// Endpoind: /books/api/v1
/**
     * *Delete book
     * *EndPoint: /books/api/v1
     * @params request.params.id
     * @return confirm msg
     */
route.delete('/:id', async (req, resp) => {
    return resp.send({message:"Data Deleted",data:req.params.id});
    //  try {
    //     booksRating_db.remove({ _id: req.params.id }, (err, deletedData) => {

    //         if (err) {
    //             return resp.status(500).json({ message: "Message" + err })
    //         } else if (deletedData) {

    //             resp.send({ message: "Book Deleted Successfully",data:true })
    //         }
    //         else { 
    //             resp.status(404).json({ message: "No Book Found " })
    //         }

    //     })

    // }
    // catch (e) {
    //     resp.status(500).json({ message: "Error" + e });

    // }
})



// Search By Book Name
// Endpoind: /books/api/v1
route.get('/search/:name', async (req, resp) => {
    
    try {
        if(req.params.name)
        {
            let word = new RegExp(req.params.name);
        await booksRating_db.find({ book: { $regex: word } }, (err, searchedData) => {
            if (err) {
                return resp.status(500).json({ message: "Error " + err })
            }
            if (searchedData == null) {

                return resp.status(404).json({ message: "Record not Found" })

            }
            resp.send({ message: "Data Found Successfully", data: searchedData });
        })
        }
        
    }
    catch (err) {
        return resp.status(500).json({ message: "Error " + err })
    }
})

module.exports = route;