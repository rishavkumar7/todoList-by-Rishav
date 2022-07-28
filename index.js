const express = require("express");
const path = require("path");
const app = express();
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const port = process.env.PORT || 6001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("engine view", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
let comments = [
    {
        "id": uuid(),
        "username": "Rishav",
        "comment": "I'm looking for good mentorship and wonderful opportunities !!"
    },
    {
        "id": uuid(),
        "username": "Sundar Pichai",
        "comment": "I'm a Google CEO"
    },
    {
        "id": uuid(),
        "username": "Mark Zukerberg",
        "comment": "I'm a Meta CEO"
    },
];
app.get("/comments", (req, res) => {
    res.render("index.ejs", { comments });
});
app.get("/comments/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    const id = uuid();
    comments.push({ id, username, comment });
    res.redirect("/comments");
});
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c[`id`] === id);
    res.render("show.ejs", { comment });
});
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("edit.ejs", { comment });
});
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const originalComment = comments.find(c => c.id === id);
    const { comment } = req.body;
    const newComment = comment;
    originalComment.comment = newComment;
    res.redirect(`/comments/${id}`);
});
app.delete("/comment/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
});