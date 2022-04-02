import axios from "axios"
import { useState } from "react"

import { useRouter } from "next/router"

const Signup = () => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const signUpUser = async ( event ) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData)
            setSuccessMessage( response.data.message );

            setFormData({
                name: "",
                email: "",
                password: ""
            })

            router.push('/login');
            
        } catch( error ) {
            setErrorMessage( error.response.data.message );
        }
        
    }

    return (
        <div className="form-signup-wrapper">
            <main className="form-signup">
                {
                    errorMessage &&  (
                        <div className="alert alert-danger" role="alert">
                            { errorMessage }
                        </div>
                    )
                }
                {
                    successMessage &&  (
                        <div className="alert alert-success" role="success">
                            { successMessage }
                        </div>
                    )
                }
                <form onSubmit={signUpUser}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" name="name" className="form-control" id="floatingName" placeholder="john doe" value={formData.name} onChange={ e => setFormData( { ...formData, name: e.target.value } ) } />
                        <label htmlFor="floatingName">Full name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" name="email" className="form-control" id="floatingEmail" placeholder="name@example.com"  value={formData.email} onChange={ e => setFormData( { ...formData, email: e.target.value } ) } />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" value={formData.password} onChange={ e => setFormData( { ...formData, password: e.target.value } ) } />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
    )
}

export default Signup