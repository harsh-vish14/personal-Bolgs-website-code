const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/date.js");
const _ = require('lodash');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


var aboutUS = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, rem accusamus. Similique ipsa accusantium, neque, voluptatum officia voluptatem odio fuga id dolore aut ea tempora eligendi consequatur ratione quidem modi!"
var contactUS = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, rem accusamus. Similique ipsa accusantium, neque, voluptatum officia voluptatem odio fuga id dolore aut ea tempora eligendi consequatur ratione quidem modi!"

var details = []

app.post("/", (req, res) => {
    var userTitle = req.body.title;
    var userContent = req.body.content;
    var uploadDateAndTime = day.getDate;
    details.push({ title: userTitle, content: userContent, date: uploadDateAndTime });
    res.redirect('/');

})



// all get methods
// home page
app.get(`/`, (req, res) => {
    res.render("index", { details: details });
})

// submission page
app.get("/submission", (req, res) => {
    res.render("dataSubmission");
})

// contact US page
app.get("/about", (req, res)=> {
    res.render("about",{about: aboutUS})
})

// about us page
app.get("/contact", (req, res)=> {
    res.render("contact", { contact: contactUS });
})

// 404 page
app.get("/404-pageNotFound", (req, res) => {
    res.render("notfound");
})

// creating custom pages
app.get("/blog/:postName", (req, res) => {

    details.forEach(detail => {
        if (_.lowerCase(detail.title) == _.lowerCase(req.params.postName)) {
            res.render("blog", { title: detail.title, content: detail.content, date: detail.date });
            
        }
    });
})

// checking link is present or not if not then move to 404 page not found page
app.get('*', function (req, res) {
    res.redirect("/404-pageNotFound")
    res.status(404);
});


app.listen(process.env.PORT || 3000, () => {
    console.log("server is running at port 3000");
})