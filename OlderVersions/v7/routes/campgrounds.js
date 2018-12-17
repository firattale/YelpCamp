const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

//   INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds });
		}
	});
});

// CREATE - ADD NEW CAMPGROUND TO DB
router.post("/", function(req, res) {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const newCampground = { name: name, image: image, description: desc };
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", function(req, res) {
	res.render("campgrounds/new");
});

// SHOW -SHOWS MORE INFO ABOUT A CAMPGROUND
router.get("/:id", function(req, res) {
	// find the campground with provided ID
	Campground.findById(req.params.id)
		.populate("comments")
		.exec(function(err, foundCampground) {
			if (err) {
				console.log(err);
			} else {
				console.log(foundCampground);
				// render show template with that campground
				res.render("campgrounds/show", { campground: foundCampground });
			}
		});
});

module.exports = router;
