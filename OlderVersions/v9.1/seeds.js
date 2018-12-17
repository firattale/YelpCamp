const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
  {
    name: "Clouds Rest",
    image:
      "https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104497f8c979a6e8b7b9_340.jpg",
    description:
      "Lorem ipsum dolor amet chartreuse waistcoat poutine vexillologist, thundercats meh knausgaard direct trade tattooed 90's lomo roof party snackwave air plant. +1 succulents copper mug tattooed, tofu DIY vexillologist pinterest jean shorts pork belly pug. Church-key +1 quinoa irony adaptogen. Fingerstache messenger bag street art shabby chic gochujang biodiesel farm-to-table put a bird on it glossier ramps church-key marfa. IPhone pop-up distillery squid everyday carry, freegan lyft scenester mixtape kickstarter meggings 3 wolf moon fam fixie cliche. Craft beer ennui flexitarian mustache portland. Venmo tacos artisan 3 wolf moon, ramps single-origin coffee pug blue bottle church-key poke street art woke authentic biodiesel."
  },
  {
    name: "Desert Mesa",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description:
      "Lorem ipsum dolor amet chartreuse waistcoat poutine vexillologist, thundercats meh knausgaard direct trade tattooed 90's lomo roof party snackwave air plant. +1 succulents copper mug tattooed, tofu DIY vexillologist pinterest jean shorts pork belly pug. Church-key +1 quinoa irony adaptogen. Fingerstache messenger bag street art shabby chic gochujang biodiesel farm-to-table put a bird on it glossier ramps church-key marfa. IPhone pop-up distillery squid everyday carry, freegan lyft scenester mixtape kickstarter meggings 3 wolf moon fam fixie cliche. Craft beer ennui flexitarian mustache portland. Venmo tacos artisan 3 wolf moon, ramps single-origin coffee pug blue bottle church-key poke street art woke authentic biodiesel."
  },
  {
    name: "Canyon Floor",
    image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg",
    description:
      "Lorem ipsum dolor amet chartreuse waistcoat poutine vexillologist, thundercats meh knausgaard direct trade tattooed 90's lomo roof party snackwave air plant. +1 succulents copper mug tattooed, tofu DIY vexillologist pinterest jean shorts pork belly pug. Church-key +1 quinoa irony adaptogen. Fingerstache messenger bag street art shabby chic gochujang biodiesel farm-to-table put a bird on it glossier ramps church-key marfa. IPhone pop-up distillery squid everyday carry, freegan lyft scenester mixtape kickstarter meggings 3 wolf moon fam fixie cliche. Craft beer ennui flexitarian mustache portland. Venmo tacos artisan 3 wolf moon, ramps single-origin coffee pug blue bottle church-key poke street art woke authentic biodiesel."
  }
];

function seedDB() {
  // remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    // });
    // // add a few campgrounds
    // data.forEach(function (seed) {
    //     Campground.create(seed, function (err,campground) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log("added a campground");
    //             // add a few comments
    //             Comment.create(
    //                 {
    //                     text:"This place is great!",
    //                     author:"Jack"
    //             }, function (err,comment) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                 campground.comments.push(comment);
    //                 campground.save();
    //                 console.log("created new comment!");
    //                 }
    //             });
    //          }
    //     });
  });
}

module.exports = seedDB;
