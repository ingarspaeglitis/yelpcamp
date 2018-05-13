const express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),    
    passport = require("passport"), 
    flash =    require("connect-flash"), 
    LocalStrategy = require("passport-local").Strategy,
    methodOverride = require("method-override"),
    Campground= require("./models/campground"),
    Comment= require("./models/comment"),
    User =  require("./models/user"),
    seedDB    = require("./seeds");


require('dotenv').config();

const commentRoutes = require("./routes/comments");   
const campgroundRoutes = require("./routes/campgrounds");  
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.locals.moment = require('moment');
//seedDB(); 

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Ingars Secret",
    resave: false,
    saveUninitialized: false

}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {

    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();

});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

/* this causes some issues with generic absolute image urls and other things 
app.get('*', function (req, res) {
    res.send('Sorry, page not found... What are you doing with your life?');
});
*/


app.listen(3000, function () {
    console.log("Server has started");
});
