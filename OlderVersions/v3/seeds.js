const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
  {
    name: "Clouds Rest",
    image:
      "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c571a5eeb1bc_340.jpg",
    description: "blah blah blah"
  },
  {
    name: "Desert Mesa",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "blah blah blah"
  },
  {
    name: "Canyon Floor",
    image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg",
    description: "blah blah blah"
  }
];

function seedDB() {
  // remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
  });
  // add a few campgrounds
  data.forEach(function(seed) {
    Campground.create(seed, function(err, campground) {
      if (err) {
        console.log(err);
      } else {
        console.log("added a campground");
        // add a few comments
        Comment.create(
          {
            text: "This place is great!",
            author: "Jack"
          },
          function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("created new comment!");
            }
          }
        );
      }
    });
  });
}

module.exports = seedDB;
