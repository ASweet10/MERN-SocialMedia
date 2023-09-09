import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path' // comes with node
import { fileURLToPath } from 'url'
import { register } from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { verifyToken } from './middleware/auth.js'
import { createPost } from './controllers/posts.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users, posts } from './data/index.js'

/* Middleware Configurations */
const fileName = fileURLToPath(import.meta.url) // Grab file url
const dirName = path.dirname(fileName)
dotenv.config() // To use dotenv files
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
//Set directory of where we keep assets (images)
// Storing locally, would use cloud storage / S3 in production
app.use("/assets", express.static(path.join(dirName, 'public/assets')))

/* File Storage */
//When user uploads image, save to public/assets
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage }) //Use this variable to upload files


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)


/* ROUTES */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001 //Backup if .env doesn't work
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

    /* MANUAL DATA INJECTION; ONLY ADD ONCE */
    //User.insertMany(users)
    //Post.insertMany(posts)
}).catch((error) => console.log(`${error} did not connect`))

