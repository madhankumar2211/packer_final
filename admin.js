var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//Allusers
router.get('/allusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//All orders
router.get("/vieworders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//order complete
router.put("/updateorders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
            db.collection("booknow").updateOne(
                { _id: req.body._id },
                {
                    $set: {
    
                        Record_status: 0,
                        "order_status.status" : "Completed"

                    }
                }, (err, data) => {
                    res.send(data)
                })
    })
})


//process order
router.put("/processorders", (req, res) => {
    console.log(req.params);
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
            db.collection("booknow").updateOne(
                { _id: req.body._id },
                {
                    $set: {
    
                        Record_status: 1,
                        "order_status.status" : "Processing"
                    }
                }, (err, data) => {
                    res.send(data)
                })
    })
})

//all contactus
router.get('/allcontactusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('contactus').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//All bookings
router.get("/bookeddata", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {
            res.send(data)
        })
    })

})

//view all quote

router.get("/viewquote", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('quote').find().toArray((err, data) => {
            res.send(data)
        })
    })

})

//Add vehicle 


router.post("/vehicleaddnewprice",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("merit");
        db.collection("vehiclenew").insertOne(req.body,function(err,data){
            res.send(data)
        })
    })
})

//view all vehicle
router.get("/vehicleviewnew",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("merit")
        db.collection('vehiclenew').find().toArray((err,data) => {
            res.send(data)
        })
    })
})



module.exports = router;
