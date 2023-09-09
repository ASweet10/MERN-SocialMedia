import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        firstName: { type: String, required: true }, 
        lastName: { type: String, required: true },
        location: String,
        desription: String,
        picturePath: String,
        userPicturePath: String,
        likes: { type: Map, of: Boolean }, //Add user to this map when they click like on post
        comments: { type: Array, default: [] }
    }, 
    { timestamps: true } // Automatic dates for when things are created/updated
)
 
const Post = mongoose.model("Post", PostSchema)
export default Post