import { useState } from "react"
import { Formik } from "formik" // Forms
import * as yup from 'yup' // Validation
import { useNavigate } from 'react-router-dom' // Navigate upon login/register
import { useDispatch } from "react-redux" // Store user info with redux
import { setLogin } from "state/stateIndex"
import Dropzone from "react-dropzone" // Let user upload image

// Yup schema; Determines shape of how form library saves data
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"), // Must be a string and must have value, required
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email!").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
}

const RegisterPage = () => {
    const navigate = useNavigate()

    const login = async ( values, onSubmitProps ) => {
        const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type:': 'application/json'},
                body: JSON.stringify(values)
            })
        const loggedIn = await loggedInResponse.json()
        onSubmitProps.resetForm()
        if (loggedIn) {
            dispatchEvent(setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            }))
            navigate('/home')
        }
    }

    const register = async ( values, onSubmitProps ) => {
        // FormData from JS library; allows to send form info with image
        const formData = new FormData()
        // Loop through every key in values
        for (let value in values) {
            formData.append( value, values[value]) // Append strings
        }
        if(values.picture) {
            formData.append('picturePath', values.picture.name) // Append picture
        }

    
        const savedUserResponse = await fetch(
            'http://localhost:3001/auth/register',
            {
                method: 'POST',
                body: formData
            }
        ) 
        const savedUser = await savedUserResponse.json() // Turn into parseable json 
        onSubmitProps.resetForm() // Formik reset
        navigate('/')
    }
    
    const handleFormSubmit = async ( values, onSubmitProps ) => {
        await register( values, onSubmitProps )
    }

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={ initialValues } validationSchema={ registerSchema }>
        {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
        }) => (
            <form onSubmit={handleSubmit}>
                <div className="flex w-screen h-screen justify-center items-center bg-bg lg:px-52">
                    <div className="flex flex-col w-10/12 md:w-3/5 shadow-lg shadow-secondary rounded-md bg-white">
                        <h2 className="text-xl md:text-2xl text-center text-black p-1">Join Website Name</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 px-6 py-1">
                            <input placeholder="First Name" value={values.firstName} name="firstName"
                                onChange={handleChange} className="rounded-md p-2 border-2 border-gray"
                            >
                            </input>
                            <input placeholder="Last Name" value={values.lastName} name="lastName"
                                onChange={handleChange} className="rounded-md p-2 border-2 border-gray"
                            >
                            </input>
                        </div>
                        <div className="grid grid-cols-1 px-6 py-1">
                            <input placeholder="Location" value={ values.location }  name="location"
                                onChange={ handleChange } className="rounded-md p-2 border-2 border-gray"
                            >
                            </input>
                        </div>
                        <div className="grid grid-cols-1 px-6 pb-2 pt-1">
                            <input placeholder="Occupation" value={ values.occupation } name="occupation"
                                onChange={ handleChange } className="rounded-md p-2 border-2 border-gray"
                            >
                            </input>
                        </div>

                        <div className="px-6 py-1">
                            {/* https://react-dropzone.js.org - docs */}
                            <Dropzone accepted='.jpg, .jpeg, .png' multiple={false}
                                onDrop={acceptedFiles => setFieldValue('picture', acceptedFiles[0])}
                            >
                                {/* Pass rootProps from dropzone into next immediate div */} 
                                {({ getRootProps, getInputProps }) => (
                                    <div className="border-secondary border-2 p-3 rounded-md">
                                        <div {...getRootProps()} 
                                            className='flex justify-center items-center border-2 border-dashed border-primary p-4 hover:cursor-pointer'
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p className="text-textColor">Add picture</p>
                                            ) : (
                                                <div>
                                                    <p className="text-textColor text-sm">{values.picture.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>

                        <div className="grid grid-cols-1 gap-4 px-6 py-1">
                            <input placeholder="Email" value={ values.email } name="email"
                                onChange={ handleChange } className="rounded-md p-2 border-2 border-gray"
                            > 
                            </input>
                        </div>
                        <div className="grid grid-cols-1 gap-4 px-6 py-1">
                            <input placeholder="Password" value={ values.password } name="password"
                                type="password" // Hide input while typing
                                onChange={ handleChange } className="rounded-md p-2 border-2 border-gray"
                            >
                            </input>
                        </div>

                        <div className="grid grid-cols-1 gap-4 px-6 py-1">
                            <button type="submit" className="rounded-md font-bold text-xl p-3 bg-secondary text-white">
                                Register
                            </button>
                        </div>

                        <div className="flex flex-row gap-2 p-2">
                            <p className="text-textColor">Already have an account?</p>
                            <p  onClick={() => navigate("/")}
                                className="text-tertiary hover:cursor-pointer">
                                Login
                            </p>
                        </div>

                    </div>
                </div>
            </form>
        )}
    </Formik>
  )
}

export default RegisterPage