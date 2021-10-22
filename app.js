const express = require('express');
const app = express();

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';

const cors = require('cors');
app.use(cors());


//View 
app.get('/allusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find().toArray((err, data) => {
            res.send(data)
        })
    })
})


//create
app.post('/register', (req, res) => {
    var hashPassword = bcrypt.hashSync(req.body.psw, 8);
    req.body.psw = hashPassword
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find({ email: req.body.email }).toArray((err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                if (data.length == 1) {
                    res.send('Email already registered with us.');
                }
                else {
                    db.collection('packers_users').insertOne(req.body, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.send(err)
                        } else {
                            res.send(data);
                        }
                    });
                }
            }
        });
    });
})

//login

app.post('/login', (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find({ email: req.body.email }).toArray((err, data) => {
            if (data.length === 0) {
                res.send("Incorrect email or Password");
            }
            else {
                if (bcrypt.compareSync(req.body.psw, data[0].psw)) 
                {
                    const _id = data[0]._id;
                    const token = jwt.sign({_id},"secret_key_goes",{
                        expiresIn : 3000
                    })
                    res.status(200).json({token : token, data:data[0]});   
                } else {
                    res.send('Incorrect email or Password');
                }
            }
        });
    });
});

//forgot
app.post('/forgot', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find({ email: req.body.email }).toArray((err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                if (data.length === 0) {
                    res.send('User not found')
                }
                else {
                    res.status(200).send(data[0]._id)
                }
            }
        })
    })
})

//update password
app.put('/updatepassword', (req, res) => {
    var hashPassword = bcrypt.hashSync(req.body.psw, 8);
    req.body.psw = hashPassword
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users')
            .updateOne(
                { email: req.body.email },
                { $set: { psw: req.body.psw } },
                (err, data) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(data);
                    }
        });
    });
});

function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send({link : '/Login'});
		}
		let token = req.headers.authorization.split(' ')[1];

		if (token === 'null') {
			return res.status(401).send({link : '/Login'});
		}

		const payload =  jwt.verify(token, 'secret_key_goes');

		if (!payload) {
			return res.status(401).send({link : '/Login'});
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send({link : '/Login'});
	}
}

// //profile
// app.get('/Profile', verifyToken, (req, res) => {
//     console.log("hii");
//     res.send({ link: '/Profile' })
// })

// //payment
// app.get('/Payment', verifyToken, (req, res) => {
//     res.send({ link: '/Payment' })
// })

//update user
app.put("/updateuser/:id",verifyToken, (req, res) => {
    var hashPassword = bcrypt.hashSync(req.body.psw, 8);
    req.body.psw = hashPassword
    console.log(req.param.id);
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection("packers_users").updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {

                    name: req.body.name,

                    email: req.body.email,

                    phone: req.body.phone,

                    psw: req.body.psw,


                }
            }, (err, data) => {
                res.send(data)
            })

    })
})

//read specific user

app.get("/user",verifyToken, function (req, res) {
    let token = req.headers.authorization.split(' ')[1];
    const payload =  jwt.verify(token, 'secret_key_goes');   

    MongoClient.connect(url, function (err, con) {

        var db = con.db("merit")

        db.collection('packers_users').findOne({ _id: ObjectId(payload._id) }, function (err, data) {

            res.send(data)

        })

    })

})

//view  order based on user
app.get("/vieworder",verifyToken, (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    const payload =  jwt.verify(token, 'secret_key_goes');
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find({user_id : payload._id}).toArray((err, data) => {
            res.send(data)

        })
    })
})
app.get("/vieworders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {

            res.send(data)

        })
    })
})

//to cancel the order
app.put("/updateorder",verifyToken, (req, res) => {
    console.log('----------------8');

    console.log(req.body._id);
    console.log('----------------');
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection('booknow').findOne({ _id: ObjectId(req.body._id) }, function (err, data) {
        db.collection("booknow").updateOne(
            { _id: req.body._id },
            {
                $set: {

                    Record_status: -1,
                    "order_status.status" : "Canceled"
                }
            }, (err, data) => {
                res.send(data)
            })
        })
    })
})
app.put("/updateorders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection('booknow').findOne({ _id: ObjectId(req.body._id)}, function (err, data) {
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
})

app.put("/processorders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection('booknow').findOne({ _id: req.body._id }, function (err, data) {
            console.log(data);
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
})

//contact us

app.post('/contactinfo', (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('contactus').insertOne(req.body, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.send(data);
            }
        });
    });
})

//View 
app.get('/allcontactusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('contactus').find().toArray((err, data) => {
            res.send(data)
        })
    })
})


//orders table
app.post("/booking",verifyToken, function (req, res) {
    let token = req.headers.authorization.split(' ')[1];
    const payload =  jwt.verify(token, 'secret_key_goes'); 

    var result = new Date(req.body.Date);
    result.setDate(result.getDate() + 3);
    

    var m = Math.floor(Math.random() * (9999999999 - 7777777777) + 7777777777)
    req.body._id = "PM" + Math.floor(Math.random() * (9999999999 - 100000) + 100000)

    console.log(m);
    req.body.user_id = payload._id
    req.body.order_status = {
        b_date : req.body.Date,
        d_date : result.toLocaleDateString(),
        status : "Start",
        phone : m
    }
    console.log(req.body)
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection("booknow").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })

})



app.post("/tracking",(req,res) => {
    console.log(req.body.tid);
    MongoClient.connect(url, function (err, con) {
        var db = con.db("merit")
        db.collection('booknow').findOne({ _id: req.body.tid }, function (err, data) {
            res.send(data)
        })
    })
})


app.get("/bookeddata", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {
            res.send(data)
        })
    })

})


//quote
app.post("/insertquote", function (req, res) {
    console.log(req.body)
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
        db.collection("quote").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })

})



app.get("/viewquote", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('quote').find().toArray((err, data) => {
            res.send(data)
        })
    })

})

//vehicle 


app.post("/vehicleaddnewprice",function(req,res){

    console.log(req.body)

    MongoClient.connect(url,function(err,conn){

        var db=conn.db("merit");

        db.collection("vehiclenew").insertMany(req.body,function(err,data){

            res.send(data)

        })

    })

})



app.get("/vehicleviewnew",(req,res)=>{

    MongoClient.connect(url,function(err,conn){

        var db=conn.db("merit")

        db.collection('vehiclenew').find().toArray((err,data) => {



            res.send(data)



        })

    })

})

app.post('/addpaymentinfo',verifyToken,(req,res) => {

    console.log(req.body);

    MongoClient.connect(url,(err,conn) => {

        var db = conn.db('merit');

        db.collection('payment').insertOne(req.body,(err,data) =>{

            if(err){

                console.log(err);

                res.send(err)

            }else{

                res.send(data);

            }

        });

    });

})

app.get('/testcase',(req,res) => {
    var result = new Date('10/25/2021');
    result.setDate(result.getDate() + 3);
    res.send(result.toLocaleDateString());
})


app.listen(7080, () => {
    console.log('App running on http://localhost:7080/');
});