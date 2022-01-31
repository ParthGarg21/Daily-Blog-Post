const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eaperspiciatis quibusdam cum vitae dicta quo ducimus, ad harum distinctio,unde autem iusto consequatur ipsam animi commodi quia nostrum veritatis. Exeos error alias dolorem. Eligendi impedit reiciendis rerum ipsam illumtempore ipsum harum fuga vitae cupiditate. Voluptatibus laborum animiaccusamus enim non cumque commodi mollitia corporis! Dolores aspernaturveritatis quis fugit minus porro, enim tempora fuga explicabo maxime undecum officia in sunt ad reiciendis placeat odit voluptatem impedit ipsaquibusdam dicta ut veniam! Labore voluptate nemo modi sequi hic voluptatemasperiores minima eligendi, perspiciatis dolore repellendus delectusfacilis!";

let contactContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis feugiat, lorem sed sollicitudin sagittis, metus sapien maximus metus, et semper nisi eros eu augue. Nam cursus, nisl in tempor accumsan, risus quam vestibulum lorem, at facilisis ipsum purus a dui. Ut porta massa maximus dui posuere, in consectetur quam aliquam. Curabitur vel justo lobortis est efficitur mattis nec ut diam. Nam vitae facilisis turpis. Ut lobortis venenatis placerat. Donec consequat tempor mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque posuere eros consectetur ultricies gravida. Sed pretium arcu ut hendrerit sodales. Vestibulum pharetra mauris eu convallis fringilla.Fusce maximus ultricies sem, eget aliquet lacus ullamcorper quis. Quisque vitae ligula et tortor finibus gravida. Quisque sed nulla ultrices, condimentum velit nec, commodo velit. Etiam at fermentum erat, vel fermentum justo. Donec vitae suscipit dui. Mauris aliquam nisl et leo fringilla posuere. Nulla cursus risus ut diam luctus aliquam. Sed sed ultricies eros, et ornare enim. Duis rutrum facilisis arcu, ut scelerisque arcu accumsan ac. Duis venenatis sem vel ipsum vestibulum, vel pulvinar est dignissim. Quisque turpis tortor, dignissim sed hendrerit non, euismod ultrices nulla.";

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Server running at port 3000!");
});

app.get("/", function (req, res) {
  console.log(posts);

  res.render("home", { posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent, pageTitle: "ABOUT US" });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent, pageTitle: "CONTACT US" });
});

app.get("/compose", function (req, res) {
  res.render("compose", { pageTitle: "COMPOSE" });
});

app.post("/compose", function (req, res) {
  const body = req.body;
  let post = {
    heading: body.newPostHeading,
    content: body.newPostBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:any", function (req, res) {
  let currHeading = req.params.any;
  let flag = false;
  console.log(_.lowerCase(currHeading));
  
  for (let post of posts) {
    if (_.lowerCase(currHeading) === _.lowerCase(post.heading)) {
      console.log("Match Found");
      flag = true;
      res.render("post", {
        pageTitle: post.heading,
        content: post.content,
      });
      console.log(posts);
      break;
    }
  }

  if (!flag) {
    console.log("Match not found");
    res.redirect("/");
  }
});
