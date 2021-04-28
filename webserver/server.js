const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const app = express();
const router = express.Router();
const CryptoJS = require('crypto-js');
const mongodb = require('mongodb');

/// DB SETUP
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/mmdb";

MongoClient.connect(url, {}, function(err, client) {
    if (err) throw err;
    var db = client.db('mmdb');

    db.collection("user_cred", (err, collection) => {
        collection.countDocuments().then((res) => {
            if (res === 0) {
                console.log(res);
                MongoClient.connect(url, {}, function(err, client2) {
                    var db2 = client2.db('mmdb');
                    db2.createCollection('user_cred', {
                        validator: {
                            $jsonSchema: {
                                bsonType: "object",
                                required: [ "un", "pw"],
                                properties: {
                                    un: {
                                        bsonType: "string",
                                        description: "must be string, is required"
                                    },
                                    pw: {
                                        bsonType: "string",
                                        description: "must be string, is required"
                                    }
                                }
                            }
                        },
                    });
                    db2.collection('user_cred').insertOne(
                        { un: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", pw: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" }
                    );
                });
                MongoClient.connect(url, {}, function(err, client2) {
                    var db2 = client2.db('mmdb');
                    db2.createCollection('tokens', {
                        validator: {
                            $jsonSchema: {
                                bsonType: "object",
                                required: [ "token"],
                                properties: {
                                    token: {
                                        bsonType: "string",
                                        description: "must be string, is required"
                                    }
                                }
                            }
                        },
                    });
                    db2.collection('tokens').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 600 } );
                    client2.close();
                });
            }
        });
    })

    client.close();
});
///

/// WEB SERVER LOGIN REQUEST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/login', (req, res) => {

    var username = req.body.un;
    var password = req.body.pw;

    if (typeof username === 'undefined' || typeof password === 'undefined') {
        res.send({
            token: '', flag: 1
        });
        return
    }

    username = CryptoJS.enc.Base64.parse(username).toString(CryptoJS.enc.Hex);
    password = CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Hex);

    MongoClient.connect(url, function(err, client) {
        if (err) throw err;

        var db = client.db('mmdb');
        db.collection('user_cred').find({un: username}).next((err, result) => {
            if (err) { 
                res.send({
                    token: '', flag: 1
                });
            } else {
                if (!result)
                {
                    res.send({
                        token: '', flag: 1
                    });
                    return
                }
                if (password === result.pw){
                    let token = CryptoJS.SHA256(result.pw + new Date().toTimeString());
                    MongoClient.connect(url, function(err, client2) {
                        if (err) throw err;
                        var db2 = client2.db('mmdb')
                        db2.collection('tokens').insertOne( { "createdAt": new Date(), "token": token.toString() } );
                        client2.close();
                    });
                    let enc = CryptoJS.enc.Base64.stringify(token);
                    res.send({
                        token: enc, flag: 0
                    });
                } else {
                    res.send({
                        token: '', flag: 1
                    });
                }
            }
        })

        client.close();
    });
});

app.use('/handle', (req, res) => {
    var token = req.body.token;
    if (!token) {
        res.send({"res": 0});
    } else {
        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            db = client.db('mmdb');
            token = CryptoJS.enc.Base64.parse(token).toString(CryptoJS.enc.Hex);
            db.collection('tokens').find({"token": token}).next((err, result) => {
                if (!result) {
                    res.send({"res": 0});
                    return
                }
                if (result.token === token) {
                    res.send({"res": 1})
                } else {
                    res.send({"res": 0});
                }

            });
            client.close();
        });
    }
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
///