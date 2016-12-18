var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/users');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.route('/')
    .get(function (req, res, next) {
      /*User.find({}, function (err, product) {
        if (err) throw err;
        res.json(product);
      });*/
        res.json({
            users:[
                {
                    name:"janerose",
                    displayName:"Jain Rose Mathew",
                    address: {
                        location: "Blakstad 2D, Norway", cordintates: [-21,88]
                    }
                },
                {
                    name:"Harald Petter",
                    displayName:"Harald Petter",
                    address: {
                        location: "Vettre 34, Norway", cordintates: [-35,99]
                    }
                },
                {
                    name:"Høeg Helge",
                    displayName:"HHelge",
                    address: {
                        location: "Asker 77, Norway", cordintates: [66,-21]
                    }
                }
                ]

        });

    })

    .post(function (req, res, next) {
        //console.log(req.body.userName+"_"+req.body.password+"_"+req.body.role);
        var newUser = new User({userName: req.body.userName, password: req.body.password, role:req.body.role});
        newUser.save(function(err, resp) {
            if (err) {
                res.json(err);
                throw err
            };
            console.log('User saved successfully!');
            res.json(resp);
        });
    })

    .delete(function (req, res, next) {
      Users.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    });
module.exports = usersRouter;