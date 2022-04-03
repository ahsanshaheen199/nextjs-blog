import axios from "axios"
import { useState, useEffect } from "react"
import { getSession } from 'next-auth/react'
import { useRouter } from "next/router"

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const router = useRouter()

    useEffect(() => {
        getSession().then( session  => {
            if( session ) {
                router.replace('/')
            } else {
                setLoading(false)
            }
        } )
    }, [router])

    

    const signUpUser = async ( event ) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/signup', formData)
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

    if( loading ) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p>Loading....</p>
                    </div>
                </div>
            </div>
        )
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