const express = require("express");
const router  = express.Router({ mergeParams: true});

const Campground= require("../models/campground");
const Comment= require("../models/comment");
const middleware= require("../middleware");


router.get('/new', middleware.isLoggedIn, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground){

        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", { campground : foundCampground });
        }
    });   
});

router.post('/', middleware.isLoggedIn, function (req, res) {        
   
    Campground.findById(req.params.id, function (err, foundCampground){

        var text = req.body.comment.text;        
        var newcomment = { text: text, author: { id: req.user.id, username: req.user.username} };        

        Comment.create(newcomment, function(err, comment) { 

            if (err)
            {
                req.flash("error", "Something went wrong");
            }
            else
            {
                foundCampground.comments.push(comment);            
                foundCampground.save();

                req.flash("success", "Succesfully created comment");
                res.redirect("/campgrounds/" + req.params.id);
            }                           
        });
    });
});

router.get('/:comment_id/edit', middleware.checkCommentsOwnership, function (req, res) { 

    Campground.findById(req.params.id, function (err, foundCampground){

        if (err || !foundCampground)
        {
            req.flash("error", "Could not find campground");
            return res.redirect("back");
        }
        else
        {
            Comment.findById(req.params.comment_id, function (err, foundComment){

                res.render("comments/edit", { campgroundId : req.params.id, comment: foundComment });
            });
        }
    });
});

router.put('/:comment_id', middleware.checkCommentsOwnership, function (req, res) {

    const newComment = {

        text: req.body.comment.text       
    }

    Comment.findByIdAndUpdate(req.params.comment_id, newComment,  function (err, updatedComment){
            
        res.redirect("/campgrounds/" + req.params.id);
    });

});


router.delete('/:comment_id', middleware.checkCommentsOwnership,  function (req, res) {

    Comment.findByIdAndRemove(req.params.comment_id, function(err) {

        if (err){
            res.redirect("/campgrounds/" + req.params.id);
        }
        else
        {
            req.flash("success", "Succesfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;