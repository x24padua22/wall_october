const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UserController = require("../controllers/user.controller");
const PostController = require("../controllers/post.controller");
const CommentController = require("../controllers/comment.controller");

const WallRoute = Router();

WallRoute.get("/", (req, res) => { new ViewController(req, res).homepage(); });
WallRoute.get("/wall", (req, res) => { new ViewController(req, res).wall(); });

WallRoute.post("/login", (req, res) => { new UserController(req, res).login() });
WallRoute.post("/register", (req, res) => { new UserController(req, res).register() });

WallRoute.post("/create_post", (req, res) => { new PostController(req, res).createPost() });
WallRoute.post("/delete_post", (req, res) => { new PostController(req, res).deletePost() });

WallRoute.post("/create_comment", (req, res) => { new CommentController(req, res).createComment() });
WallRoute.post("/delete_comment", (req, res) => { new CommentController(req, res).deleteComment() });

module.exports = WallRoute;