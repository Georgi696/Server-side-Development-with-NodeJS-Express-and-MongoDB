const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

.all('/',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get('/',(req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post('/',(req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description + " " + req.params.dishId);
})
.put('/',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete('/',(req, res, next) => {
    res.end('Deleting all dishes');
})

.get('/:dishId',(req,res,next) => {
    res.end('Will send all the dishes to you!' + req.params.dishId + '\n');
})
.post('/:dishId',(req, res, next) => {
    res.statusCode = 200;
    res.write('Will add the dish: ' + req.params.dishId);
    res.end("Will update the dish " + req.body.name + ' with details ' + req.body.description);
})
.put('/:dishId',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete('/:dishId',(req, res, next) => {
    res.end('Deleting all dishes');
})

module.exports = dishRouter;