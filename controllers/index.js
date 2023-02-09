const express = require('express');
const router = express.Router();

const userRoutes = require('./userController')
router.use("/api/users", userRoutes)

const postRoutes = require('./postController')
router.use("/api/posts", postRoutes)

const commentRoutes = require('./commentController')
router.use("/api/comments", commentRoutes)

const frontEndRoutes = require('./frontEndController')
router.use("/", frontEndRoutes)

module.exports = router