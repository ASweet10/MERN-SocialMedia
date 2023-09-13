import Dropzone from "react-dropzone"
import UserImage from "components/UserImage"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state/stateIndex"
import { useMediaQuery } from "@mui/material"
import { AiOutlineEdit, AiFillDelete, AiOutlineGif } from 'react-icons/ai'
import { BiImage } from "react-icons/bi"
import { IoMdAttach } from "react-icons/io"
import { RxVideo } from "react-icons/rx"
import { IconButton } from '@mui/material'

const NewPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch()
    const [ isImage, setIsImage ] = useState(false)
    const [ image, setImage ] = useState()
    const [ preview, setPreview ] = useState()
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
    useEffect(() => {
        if(!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
    }, [image])
    const onSelectFile = e => {
        if(!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }

        setImage(e.target.files[0])
    }

    return (
        <div className="flex flex-col p-4 mx-2 bg-white rounded-md shadow-md shadow-secondary">
            <div className="flex gap-4 items-center">
                { largerThanMobile && ( <UserImage image={picturePath} className="rounded-full"/>) }
                <p className="font-bold text-xl text-secondary">What's on your mind?</p>
            </div>
            <div className="flex flex-col pt-4">
                <textarea 
                    onChange={ (e) => setPost(e.target.value) }
                    value={post}
                    type="textarea"
                    className="p-2 w-full text-md rounded-md border"
                >
                </textarea>

                <div className="flex flex-row justify-between pt-4">
                    <div className="flex flex-row gap-4">
                    <input 
                        type="file"
                        id="fileInput"
                        onChange={ onSelectFile }
                        className="file:rounded-lg file:bg-secondary file:text-white file:font-bold file:border-none hidden"
                    />
                    
                    <label htmlFor="fileInput" className=" rounded-full p-4 cursor-pointer bg-secondary">
                        <BiImage className="text-xl text-white" />
                    </label>


                    
                    </div>

                    { preview && ( 
                        <div>
                            <img src={preview} className="h-1/8 w-1/4" />
                        </div> 
                        )
                    }
                    <button disabled={!post} onClick={handlePost} className="rounded-md font-bold text-lg px-3 bg-secondary text-white">
                        POST
                    </button>
                </div>
                

            </div>
            
            {isImage && (
                <div className="bg-primary rounded-md">
                    <div className="px-6 py-1">
                        <Dropzone accepted='.jpg, .jpeg, .png' multiple={false}
                            //onDrop={handleChange()}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className="border-secondary border-2 p-3 rounded-md">
                                    <div {...getRootProps()} 
                                        className='flex justify-center items-center border-2 border-dashed border-primary p-4 hover:cursor-pointer'
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p className="text-white">Add image</p>
                                        ) : (
                                            <div>
                                                <img alt="" src={image} />
                                                {/* <p className="text-textColor text-sm">{image.name}</p> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </div>

                </div>
            )}

        </div>
    )
}

export default NewPostWidget