import jwt from 'jsonwebtoken'

export const verifyToken = async ( req, res, next ) => {
    try {
        let token = req.header("Authorization") //Grab authorization header from front-end request
        if (!token) { return res.status(403).send("Access Denied!")}

        if(token.startsWith("Bearer ")) {
             //Use string contents (token) to right of space
             // Token looks like: 'Bearer 23aewraf2da34werwq42a6er'
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next() // Proceed to next step in the function
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}