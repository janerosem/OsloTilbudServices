var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Products = require('../models/products');

var productRouter = express.Router();
//productRouter.use(bodyParser.json());

productRouter.route('/')
    .get(function (req, res, next) {
        /*Products.find({}, function (err, product) {
            if (err) throw err;
            res.json(product);
        });*/

        res.json({
            manufacturer:{
                name:"manufacturer",
                displayName:"Manufacturer",
                data:[
                    {value:"apple", displayName:"Apple"},
                    {value:"samsung", displayName:"Samsung"},
                    {value:"htc", displayName:"HTC"},
                    {value:"nokia", displayName:"Nokia"},
                    {value:"zte", displayName:"ZTE"},
                    {value:"sony", displayName:"Sony"}
                ]
            },
            screensize:{
                name:"storage",
                displayName:"Screen Size",
                data:[
                    {value:"16", displayName:"16GB"},
                    {value:"32", displayName:"32GB"}
                ]
            },
            os:{
                name:"os",
                displayName:"OS",
                data:[
                    {value:"android", displayName:"Android"},
                    {value:"ios", displayName:"iOS"},
                    {value:"windows", displayName:"Windows"}
                ]
            },
            camera:{
                name:"camera",
                displayName:"Camera",
                data:[
                    {value:"5", displayName:"5 Mpx"},
                    {value:"8", displayName:"8 Mpx"},
                    {value:"12", displayName:"12 Mpx"},
                    {value:"15", displayName:"15 Mpx"}
                ]
            }
        });
    })

    .post(function (req, res, next) {
        Products.create(req.body, function (err, product) {
            if (err) throw err;
            console.log('product created!');
            var id = product._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the product with id: ' + id);
        });
    })

    .delete(function (req, res, next) {
        Products.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

productRouter.route('/:productId')
    .get(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            res.json(product);
        });
    })

    .put(function (req, res, next) {
        Products.findByIdAndUpdate(req.params.productId, {
            $set: req.body
        }, {
            new: true
        }, function (err, product) {
            if (err) throw err;
            res.json(product);
        });
    })

    .delete(function (req, res, next) {
        Products.findByIdAndRemove(req.params.productId, function (err, resp) {        if (err) throw err;
            res.json(resp);
        });
    });



productRouter.route('/:productId/comments')
    .get(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            res.json(product.comments);
        });
    })

    .post(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            product.comments.push(req.body);
            product.save(function (err, product) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(product);
            });
        });
    })

    .delete(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            for (var i = (product.comments.length - 1); i >= 0; i--) {
                product.comments.id(product.comments[i]._id).remove();
            }
            product.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    });

productRouter.route('/:productId/comments/:commentId')
    .get(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            res.json(product.comments.id(req.params.commentId));
        });
    })

    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Products.findById(req.params.productId, function (err, product) {
            if (err) throw err;
            product.comments.id(req.params.commentId).remove();
            product.comments.push(req.body);
            product.save(function (err, product) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(product);
            });
        });
    })

    .delete(function (req, res, next) {
        Products.findById(req.params.productId, function (err, product) {
            product.comments.id(req.params.commentId).remove();
            product.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports = productRouter;