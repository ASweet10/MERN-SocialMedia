import Post from '../models/Post.js'
import User from '../models/User.js'

export const createPost = async ( req, res ) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {}, // empty, starts with 0 likes
            comments: []
        })
        await newPost.save()

        const post = await Post.find()

        res.status(201).json()
    } catch(error) {
        res.status(409).json({ message: error.message })
    }
}

/* READ */
export const getFeedPosts = async ( req, res ) => {
    try{
        const posts = await Post.find() // Find all posts from feed
        res.status(200).json(posts)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUserPosts = async ( req, res ) => {
    try{
        const { userId } = req.params
        const posts = await Post.find({ userId }) // Find all user posts
        res.status(200).json(posts)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

/* UPDATE POST */
export const likePost = async ( req, res ) => {
    try{
        const { id } = req.params //grab post relevant to user
        const { userId } = req.body
        const post = await Post.findById(id) //Grab post information
        const isLiked = post.likes.get(userId) //If userid exists in likes
        
        if(isLiked) { //If already liked...
            post.likes.delete(userId) //Delete user id from liked list
        } else {
            post.likes.set(userId, true) //Add user id to liked list
        }

        //Find and update post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes }, //pass in new likes array
            { new: true }
        )

        res.status(200).json(updatedPost)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }    
}