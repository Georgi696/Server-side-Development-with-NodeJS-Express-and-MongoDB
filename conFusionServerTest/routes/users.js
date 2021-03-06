var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
const authenticate = require('../auth.js');

router.use(bodyParser.json());

router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  User.find({}, (err,user) => {
    if(err){
      next(err);
    }
    else{
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.json(user);
    }
  })
})

router.post('/signup',(req,res,next) => {
    User.register(new User ({username:req.body.username}), 
      req.body.password, (err, user) =>{
        if(err){
          res.statusCode = 500;
          res.setHeader("Content-Type","application/json");
          res.json({err:err});
        }
        else{
          if (req.body.firsname) {
            user.firstname = req.body.firstname;
          }
          if(req.body.lastname) {
            user.lastname = req.body.lastname;
          }
            user.save((err,user) => {
              if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type","application/json");
                res.json({err:err});
                return;
              }        
          passport.authenticate("local")(req,res,() => {
          res.statusCode = 200;
          res.setHeader("Content-Type","application/json");
          res.json({sucess: true ,status: "Registration Successful! "});    
        });
      });
    };
  });
})
router.post('/login', passport.authenticate("local"), (req,res) => {
  var token = authenticate.getToken({_id:req.user._id})
  res.statusCode = 200;
  res.setHeader("Content-Type","application/json");
  res.json({sucess: true, token: token,status: "You are Logged in"});
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
