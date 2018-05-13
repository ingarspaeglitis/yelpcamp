var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({

    name : String,
    price: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: { type: Date, default: Date.now },
    author: {

        id:  {

            type:  mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
    
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;



/*
Campground.create(
    { 
        name: "Granite Hill", 
        image: "https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb7bd_340.jpg",
        description: "This is huge granite hill, no bathrooms. No water. Beautiful granite!"
    },
    function (err, newCampground){

        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log("Newly created campground");
            console.log(newCampground);
        }
    }
);


var campgrounds = [

    { name: "Salmon Creek", image: "https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb7bd_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/eb31b00e28f2083ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb5bf_340.jpg" },
    { name: "Mountains Goat's Rest", image: "https://pixabay.com/get/e833b5092df4053ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5e8b1bd_340.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb7bd_340.jpg" },   
    { name: "Mountains Goat's Rest", image: "https://pixabay.com/get/e833b5092df4053ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5e8b1bd_340.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb7bd_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/eb31b00e28f2083ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5ebb5bf_340.jpg" },
    { name: "Mountains Goat's Rest", image: "https://pixabay.com/get/e833b5092df4053ed1584d05fb1d4e97e07ee3d21cac104497f1c57ea5e8b1bd_340.jpg" }
]
*/