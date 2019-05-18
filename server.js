var express = require('express');
var formidable = require("express-formidable");
var fs = require('fs');
var app = express();


// app.get("/", function(req, res) {
//   res.send("Yay Node Girls!");
// });

// app.get("/node", function(req, res) {
//   res.send("Send nodes")
// });
//
// app.get("/chocolate", function(req, res) {
//   res.send("Mm chocolate :O")
// });
//
// app.get("/girls", function(req, res) {
//   res.send("Day 1 of building my blog")
// });





app.use(formidable());


app.post('/create-post', function(req, res) {
  console.log(req.fields);
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      console.log(file);
      console.log(file.toString());
      var allPosts = JSON.parse(file);
      var newPost = req.fields.blogpost;
      var timestamp = Date.now()
      console.log(timestamp)
        allPosts[timestamp] = newPost
        var allPostsWords = JSON.stringify(allPosts)
        fs.writeFile(__dirname + '/data/posts.json', allPostsWords, function (error, file) {
          console.log('Finished?')

      })

  });

  console.log(req.body);
    res.send('Hello there!');
});

app.use(express.static("public"));

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
})
