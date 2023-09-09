import bcrypt from 'bcrypt' // Encrypt password
import jwt from 'jsonwebtoken' // Give user token they can use for authorization
import User from '../models/User.js'

/* REGISTER USER */

export const register = async ( req, res ) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash( password, salt )

        const newUser = new User({ // Creating new mongodb object
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: 112,
            impressions: 112
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser) // No error, send json data
    } catch (error) {
        res.status(500).json({ error: error.message }) // If error, send message to frontend
    }
}

/* LOG-IN FUNCTION */
/* Basic authentication, more robust 3rd-party solution used in production */
export const login = async ( req, res ) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email }) // Use mongoose to try to find email
        if (!user) return res.status(400).json({ msg: "User does not exist!" }) // 400: Bad request: server cannot / will not process the request

        const isMatch = await bcrypt.compare(password, user.password) // Compare entered pw to one in database
        if(!isMatch) return res.status(400).json({ msg: "Password does not match!" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({ token, user }) //200: OK success: Request succeeded
    } catch(error) {
        res.status(500).json({ error: error.message }) //500: Internal Server error: General server problem
    }
}