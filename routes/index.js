const express = require("express");
const router  = express.Router();

const passport = require("passport");
const User =  require("../models/user");

router.get('/', function (req, res) {
    res.render('landing');
});


// Auth routes

router.get('/register', function (req, res) {

    res.render('register', {page: 'register'});
});

router.post('/register', function (req, res) {

    const newUser = new User({ username: req.body.username});

    User.register(newUser, req.body.password, function(err, user){

        if (err)
        {
            console.log(err);
            return res.render("register", { error: err.message} );          
        }
        else
        {
            passport.authenticate("local")(req, res, function(){

                req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
                res.redirect("/campgrounds");
            });

        }
    });
});

// show login form
router.get('/login',  (req, res) => {

    res.render('login', {page: 'login'});
});
  

router.post('/login',
            passport.authenticate('local', 
                        { successRedirect: '/campgrounds',
                          failureRedirect: '/login' 
                        })
);

router.get('/logout',  (req, res) => {

    req.logout();
    req.flash("success", "Succesfully logged out!");
    res.redirect("/campgrounds");
});  

module.exports = router;