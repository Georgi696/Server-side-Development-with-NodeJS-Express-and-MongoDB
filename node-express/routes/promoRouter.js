const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

.all('/',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get('/',(req,res,next) => {
    res.end('Will send all the promotion to you!');
})
.post('/',(req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description + " " + req.params.promoId);
})
.put('/',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete('/',(req, res, next) => {
    res.end('Deleting all promotion');
})

.get('/:promoId',(req,res,next) => {
    res.end('Will send all the promotion to you!' + req.params.promoId);
})
.post('/:promoId',(req, res, next) => {
    res.statusCode = 200;
    res.write('Will add the promotion: ' + req.params.promoId + '\n');
    res.end("Will update the promotion " + req.body.name + ' with details ' + req.body.description);
})
.put('/:promoId',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete('/:promoId',(req, res, next) => {
    res.end('Deleting all promotion ' );
})

module.exports = promoRouter;