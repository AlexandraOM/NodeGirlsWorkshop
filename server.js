var express = require("express");
var formidable = require("express-formidable");
var fs = require("fs");
var app = express();

// app.get("/", function(req, res) {
//   res.send("Yay Node Girls!");
// });

// app.get("/node", function(req, res) {
//   res.send("Send nodes");
// });
//
// app.get("/chocolate", function(req, res) {
//   res.send("Mm chocolate :O");
// });
//
// app.get("/girls", function(req, res) {
//   res.send("just want to have FUNdamental rights");
// });

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

app.use(formidable());

app.post("/create-post", function(req, res) {
  console.log(req.fields);
  //Argument 1: the location of the file you want to write to
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    console.log(file);
    console.log(file.toString());
    var parsedFile = JSON.parse(file);
    //Argument 2: the data you want to write
    var newPost = req.fields.blogpost;
    var timestamp = Date.now();
    console.log(timestamp);
    parsedFile[timestamp] = newPost;
    var allPostsWords = JSON.stringify(parsedFile);
    fs.writeFile(__dirname + "/data/posts.json", allPostsWords, function(
      error,
      file
    ) {
      console.log(req.fields);
    });
  });
});

app.get("/get-posts", function(req, res) {
  res.sendFile(__dirname + "/data/posts.json");
});

app.use(express.static("public"));
