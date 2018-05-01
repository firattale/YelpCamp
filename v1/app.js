var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use (bodyParser.urlencoded({extended:true }));
app.set("view engine","ejs");

app.get("/", function (req,res) {
    res.render("landing");
});

var campgrounds = [
          {name:"Salmon Creek", image:"https://farm9.staticflickr.com/8037/7930276820_0850df1e23.jpg"},
          {name:"Granite Hill", image:"https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
          {name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name:"Salmon Creek", image:"https://farm9.staticflickr.com/8037/7930276820_0850df1e23.jpg"},
          {name:"Granite Hill", image:"https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
          {name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
                    {name:"Salmon Creek", image:"https://farm9.staticflickr.com/8037/7930276820_0850df1e23.jpg"},
          {name:"Granite Hill", image:"https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
          {name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
          
       ];
       
app.get("/campgrounds", function (req,res) {
   
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function (req,res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground)
    // redirect back to campgrounds page
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function (req,res) {
    res.render("new.ejs");
});
// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function () {
console.log("YelpCamp has started!!!"
)}
);