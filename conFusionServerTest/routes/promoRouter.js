const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promos = require('../models/promotions');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json())
//route Promotions
promoRouter.route('/')
.get((req,res,next) => {
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promos.create(req.body)
    .then((promo) => {
        console.log('Promotion Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promos');
})
.delete((req, res, next) => {
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
//route Promos:id
promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promos/ '+ req.params.promoId);
})
.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
//route promoId/promotions
promoRouter.route('/:promoId/promotions')
.get((req, res, next) => {
    Promos.findById(req.params.promoId)
    .then((promo) =>{
        if (promo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }
        else{
            err = new Error("Promotion " + req.params.promoId + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));    
})
.post((req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            promo.save().then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
        }
        else{
            err = new Error("Promotion " + req.params.promoId + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported in /Promos/ " + req.params.promoId + " /comments");
})
.delete((req,res,next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            for(var i = (promo.promotions.length - 1); i >= 0; i--){
                promo.comments.id(promo.comments[i]._id).remove();
            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));
        }
        else{
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err))
})
module.exports = promoRouter;