var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use (bodyParser.urlencoded({extended:true }));
app.set("view engine","ejs");

app.get("/", function (req,res) {
    res.render("landing");
});


// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name:"Granite Hill", 
//     image:"https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg",
//     description:"This is a huge granite hill,no bathrooms,no water. Beautiful granite!"
//     }, 
//         function (err, campground) {
//                 if (err) {
//                  console.log("error");  
//                          }else{
//                  console.log("Newly Created Campground: ");
//                  console.log(campground);
//                          }
//                  });


//   INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function (req,res) {
    // Get all campgrounds from DB
    Campground.find({},function (err,allCampgrounds) {
        if (err) {
            console.log(err);
                 }   else {
                res.render("index", {campgrounds:allCampgrounds});
                          }
    });
});

// CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function (req,res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // Create a new campground and save to DB
    Campground.create(newCampground,function (err,newlyCreated) {
        if (err) {
            console.log(err);
        } else{
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
              }
    });
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function (req,res) {
    res.render("new.ejs");
});

// SHOW -SHOWS MORE INFO ABOUT A CAMPGROUND
app.get("/campgrounds/:id",function (req,res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }else{
             // render show template with that campground
             res.render("show", {campground:foundCampground});
             }
    });
});



// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function () {
console.log("YelpCamp has started!!!"
)}
);