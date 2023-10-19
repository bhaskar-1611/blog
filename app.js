//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
// const homeStartingContent = "This is my Blog, Just wanted to create a sort of daily journal wanted to store my notes and things to start in sort of to-do list at so it would feel fresh to encounter my experiences and my things in storing manner";
const aboutContentName = "👋 Hi, I’m Sai Venkata Bhaskara Varma D"
const aboutContentInterests = "👀 I’m interested in Development and Stuff " 
const aboutContentLearn = "🌱 I’m currently learning about Full-stack Development(MERN Stack)";
const contactPageEmail = " dsvbvarma@gmail.com ";
const contactPagePhone = " +91 8341545979";

const app = express();
let posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req,res){
  res.render("home", { Posts: posts} );
});
app.get("/about", function(req,res){
  res.render("about", {aboutContentName : aboutContentName, aboutContentInterests: aboutContentInterests, aboutContentLearn:aboutContentLearn});
});
app.get("/contact", function(req,res){
  res.render("contact", {contactPageEmail:contactPageEmail ,contactPagePhone: contactPagePhone});
});
app.get("/compose", function(req, res){
  res.render("compose");
});
app.post("/compose", function(req,res){
  const post = {
    title: req.body.titleInput,
    content : req.body.postInput
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName", function(req,res){
  const requestedTitle = lodash.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const usedTitle = lodash.lowerCase(post.title);
    if(requestedTitle === usedTitle){
      res.render("post", {reqPost: post});
    } else{
      console.log("Not a Match");
    }
  });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
