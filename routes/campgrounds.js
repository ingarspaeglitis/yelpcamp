const express = require("express");
const router  = express.Router();

const Campground= require("../models/campground");
const middleware= require("../middleware");


router.get('/', function (req, res) {

    Campground.find({}, function(err, allCampgrounds) {

        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render('campgrounds/Index', { campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });
   
});

router.post('/', middleware.isLoggedIn, function (req, res) {

    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const author = { 
        id: req.user.id, 
        username: req.user.username
    }

    const newCampground = { 
        name: name, 
        price: price,
        image: image,
        description: description, 
        author:   author
    };
   
    Campground.create(newCampground, function(err, newlyCreated){

        if (err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/");
        }
    });
    
});

router.get('/new', middleware.isLoggedIn, function (req, res) {

    res.render('campgrounds/new');
});


router.get('/:id', function (req, res) {
   
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground){

        if (err || !foundCampground )
        {
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        else
        {
            res.render("campgrounds/show", {campground: foundCampground} );
        }

    });   
});

router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground){
            res.render("campgrounds/edit", { campground: foundCampground});
    });

});

router.put('/:id', middleware.checkCampgroundOwnership, function (req, res) {

    const newCampground = {

        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }

    Campground.findByIdAndUpdate(req.params.id, newCampground,  function (err, updatedCampground){
            
        res.redirect("/campgrounds/" + req.params.id);
    });

});

router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {

    Campground.findByIdAndRemove(req.params.id, function(err) {

        if (err){
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;