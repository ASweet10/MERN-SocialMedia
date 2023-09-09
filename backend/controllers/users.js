import User from "../models/User.js"

/* READ */
export const getUser = async ( req, res ) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUserFriends = async ( req, res ) => {
    try{
        const { id } = req.params
        const user = await User.findById(id)
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {  _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)
    } catch(error) {
        res.status(404).json({ message: error.message })        
    }
}

/* UPDATE */
export const addRemoveFriend = async ( req, res ) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        //Remove Friend
        if(user.friends.includes(friendId)) { //If friend Id is part of friend's list...
            user.friends = user.friends(filter((id) => id !== friendId)) //Copy array except for element where id=friendId
            friend.friends = friend.friends.filter((id) => id !== id) //Remove user from friend's list
        }
        //Add friend 
        else {
            user.friends.push(friendId) //Add friend to user's list
            friend.friends.push(id) //Add user to friend's list
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {  _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        
        res.status(200).json(formattedFriends)
    } catch(error) {
        res.status(404).json({ message: error.message })                
    }
}