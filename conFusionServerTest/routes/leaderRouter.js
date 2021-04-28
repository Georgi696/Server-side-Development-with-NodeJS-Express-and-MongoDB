const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

.all('/',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get('/',(req,res,next) => {
    res.end('Will send all the leader to you!');
})
.post('/',(req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description + " " + req.params.leaderId);
})
.put('/',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leader');
})
.delete('/',(req, res, next) => {
    res.end('Deleting all leader');
})

.get('/:leaderId',(req,res,next) => {
    res.end('Will send all the leader to you!' + req.params.leaderId);
})
.post('/:leaderId',(req, res, next) => {
    res.statusCode = 200;
    res.write('Will add the leader: ' + req.params.leaderId + '\n');
    res.end("Will update the leader " + req.body.name + ' with details ' + req.body.description);
})
.put('/:leaderId',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leader');
})
.delete('/:leaderId',(req, res, next) => {
    res.end('Deleting all leader ' );
})

module.exports = leaderRouter;