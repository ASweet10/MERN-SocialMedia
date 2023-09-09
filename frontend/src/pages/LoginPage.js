import { Formik } from "formik" // Forms
import * as yup from 'yup' // Validation
import { useNavigate } from 'react-router-dom' // Navigate upon login/register
import { useDispatch } from "react-redux" // Store user info with redux
import { setLogin } from "state/stateIndex"

// Yup schema; Determines shape of how form library saves data
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email!").required("required"),
    password: yup.string().required("required"),
})

const initialValues = {
    email: '',
    password: '',
}

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const login = async ( values, onSubmitProps ) => {
        try{
            const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            const loggedIn = await loggedInResponse.json()
            onSubmitProps.resetForm()
            if (loggedIn) {
                dispatch(setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                }))
                navigate('/home')
            }
        } catch(error) {
            console.log(error)
            //alert("There was an error. Please try again.")
        }

    }
    
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login( values, onSubmitProps )
    }

    return (
        <Formik onSubmit={handleFormSubmit} initialValues={ initialValues } validationSchema={ loginSchema }>
            {({
                values,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="flex w-screen h-screen justify-center items-center bg-bg lg:px-52">
                        <div className="flex flex-col w:4/5 md:w-3/5 shadow-lg shadow-secondary rounded-md bg-white">
                            <h2 className="text-xl md:text-2xl text-center text-black p-4">Sign in to Green Thumb</h2>
                            <div className="grid grid-cols-1 gap-4 px-6 py-3">
                                <input placeholder="Email"
                                    value={ values.email }
                                    onChange={ handleChange }
                                    className="rounded-md p-3 border-2 border-gray"
                                    name="email"
                                ></input>
                            </div>
                            <div className="grid grid-cols-1 gap-4 px-6 py-3">
                                <input 
                                    placeholder="Password"
                                    type="password" // Hide input while typing
                                    value={ values.password }
                                    onChange={ handleChange }
                                    name="password"
                                    className="rounded-md p-3 border-2 border-gray"
                                ></input>
                            </div>

                            <div className="grid grid-cols-1 gap-4 px-6 py-3">
                                <button type="submit" className="rounded-md font-bold text-xl p-3 bg-secondary text-white">
                                    Log In
                                </button>
                            </div>

                            <div className="flex flex-row gap-2 p-4">
                                <p className="text-black text-sm md:text-lg">
                                    Don't have an account?
                                </p>
                                <p onClick={() => navigate("/register")} className="text-sm md:text-lg text-tertiary hover:cursor-pointer">
                                    Sign up
                                </p>
                            </div>

                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default LoginPage