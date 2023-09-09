import express from 'express'
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'
import { getUser } from '../controllers/users.js'

const router = express.Router()

/* READ */
router.get("/", verifyToken, getFeedPosts) // Grab user feed when on home page
router.get("/:userId/posts", verifyToken, getUserPosts) // Get user's posts

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost) // Like/unlike post

export default router