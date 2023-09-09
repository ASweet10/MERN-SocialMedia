import Dropzone from "react-dropzone"
import UserImage from "components/UserImage"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state/stateIndex"
import { Divider, useMediaQuery } from "@mui/material"
import { AiOutlineEdit, AiFillDelete, AiOutlineGif } from 'react-icons/ai'
import { BiImage } from "react-icons/bi"
import { BsMicFill } from "react-icons/bs"
import { IoMdAttach } from "react-icons/io"
import { FiMoreHorizontal } from 'react-icons/fi'

const NewPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch()
    const [ isImage, setIsImage ] = useState(false)
    const [ image, setImage ] = useState(null)
    const [ post, setPost ] = useState("")
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const largerThanMobile = useMediaQuery("(min-width: 1000px)")

    const handlePost = async () => {
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)
        if (image) {
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData
        })
        const posts = await response.json()
        dispatch(setPosts({ posts }))
        setImage(null)
        setPost("")
    }

    return (
        <div className="p-4 mx-2 bg-white rounded-md shadow-md shadow-secondary">
            <div className="flex gap-4 items-center">
                { largerThanMobile && ( <UserImage image={picturePath} className="rounded-full"/>) }
                <input 
                    placeholder="What's on your mind?"
                    onChange={ (e) => setPost(e.target.value) }
                    value={post}
                    className="rounded-md px-12 py-2"
                >
                </input>
            </div>
            <Divider sx={{ margin: "0.75rem 0"}} />

            {isImage && (
                <div className=" bg-primary rounded-md">
                    <div className="border-4 border-solid mt-2 p-4">
                        <Dropzone accepted='.jpg, .jpeg, .png' multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className="border-solid border-2 p-4 rounded-md">
                                    <div {...getRootProps()} 
                                        className='flex w-full justify-center items-center border-2 border-dashed border-primary p-4 hover:cursor-pointer'
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p className="text-textColor">Add image</p>
                                        ) : (
                                            <div>
                                                <p className="text-textColor text-sm">{image.name}</p>
                                                <AiOutlineEdit/>
                                            </div>
                                        )}
                                    </div>
                                    {image && (
                                        <div>
                                            <AiFillDelete />
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
            )}


            <div className="flex flex-row p-6 bg-white rounded-md">
                <div className="p-4 bg-white rounded-md gap-1" onClick={() => setIsImage(!isImage)}>
                    <BiImage />
                    <p className="text-textColor hover:cursor-pointer">Image</p>
                </div>

                {largerThanMobile ? (
                    <div className="flex flex-row gap-4">
                        <div className="bg-white rounded-md gap-1">
                            <AiOutlineGif />
                            <p className="text-textColor">Clip</p>  
                        </div>
                        <div className="bg-white rounded-md gap-1">
                            <IoMdAttach />
                            <p className="text-textColor">Attachment</p>  
                        </div>
                        <div className="bg-white rounded-md gap-1">
                            <BsMicFill />
                            <p className="text-textColor">Audio</p>
                        </div>

                    </div>
                ) : (
                    <div className="p-6 bg-primary rounded-md gap-1">
                        <FiMoreHorizontal />
                    </div>
                )}

                <button 
                    disabled={!post}
                    onClick={handlePost}
                    className="bg-primary text-textColor rounded-full p-2"
                >
                    POST
                </button>
            </div>
        </div>
    )
}

export default NewPostWidget