import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const maxPosts = 20;
const cols = 4;
let postIndex = -1;
let posts = Array.from({ length: maxPosts }, () => Array(cols).fill(null));;
let postNum = 0;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.post('/submit', (req,res) =>{
    if (postNum < maxPosts){

    const authorName = req.body["authName"];
    const blogDate = new Date().toLocaleString('en-US');
    const blogTitle = req.body["title"];
    const blogText = req.body["blogText"];
    
    posts[postNum][0] = blogTitle;
    posts[postNum][1] = authorName;
    posts[postNum][2] = blogDate;
    posts[postNum][3] = blogText;

    res.render("index.ejs", {blogPosts: posts, postNumber: postNum + 1});
    postNum += 1;
    }

    else{
        console.log("Max Posts reached");
        res.render("index.ejs", {blogPosts: posts, postNumber: postNum});
    }
});

app.post('/delete', (req,res) =>{
    const postIndex =  req.body.deleteId;

    posts.splice(postIndex,1);

    res.render("index.ejs", {blogPosts: posts, postNumber: postNum - 1});
    postNum -= 1;

});

app.post('/save', (req,res) =>{
    const authorName = req.body["authName"];
    const blogDate = new Date().toLocaleString('en-US');
    const blogTitle = req.body["title"];
    const blogText = req.body["blogText"];

    posts[postIndex][0] = blogTitle;
    posts[postIndex][1] = authorName;
    posts[postIndex][3] = blogText;

    res.render("index.ejs", {blogPosts: posts, postNumber: postNum});

});

app.post('/edit', (req,res) =>{
    postIndex =  req.body.editId;
    const item = posts[postIndex];
    res.render("edit.ejs", {item});
});



app.listen(port, () => {
    console.log(`server running on port ${port}.`);
})