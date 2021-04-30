const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leader = require('../models/leaders');
const { resourceLimits } = require('node:worker_threads');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())
//route Leader
leaderRouter.route('/')
.get((req,res,next) => {
    Leader.find({})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leader.create(req.body)
    .then((leader) => {
        console.log('Leaders Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    Leader.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
//route Leader:id
leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leader.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Leaders/ '+ req.params.leaderId);
})
.put((req, res, next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
//route leaderId/leaders
leaderRouter.route('/:leaderId/leaders')
.get((req, res, next) => {
    Leader.findById(req.params.leaderId)
    .then((leader) =>{
        if (leader != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else{
            err = new Error("Leaders " + req.params.leaderId + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));    
})
.post((req,res,next) => {
    Leader.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            leader.save().then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
        }
        else{
            err = new Error("Leaders " + req.params.leaderId + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported in /Leaders/ " + req.params.leaderId);
})
.delete((req,res,next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((leader) => {
            console.log("Deleted\n ")
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);        
    }, (err) => next(err)).catch((err) => next(err))
})
module.exports = leaderRouter;