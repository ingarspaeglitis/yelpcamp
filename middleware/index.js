
const Campground= require("../models/campground");
const Comment= require("../models/comment");

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {

    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, function (err, foundCampground) {

            if (err || !foundCampground){

                req.flash("error", "Sorry, that campground does not exist!");
                res.redirect("/campgrounds");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {

                   next();                    
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next) {
    
    if (req.isAuthenticated()) {

        Comment.findById(req.params.comment_id, function (err, foundComment) {

            if (err || !foundComment){

                req.flash("error", "Comment not found or other error. Message: " + err.message);
                res.redirect("back");
            }
            else {
                
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {

                   next();                    
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next(); 
    }

    req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
}


module.exports = middlewareObj;