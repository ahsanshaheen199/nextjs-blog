import { useState, useEffect } from "react"

import { signIn, getSession } from 'next-auth/react'
import {useRouter} from "next/router"

const Login = () => {

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then( session  => {
            if( session ) {
                router.replace('/')
            } else {
                setLoading(false)
            }
        } )
    }, [router])
    


    const [formData, setFormData] = useState({
        password: "",
        email: ""
    })

    const [errorMessage, setErrorMessage] = useState(null)

    const signInUser = async ( event ) => {
        event.preventDefault()
        
        const result = await signIn("credentials", { ...formData, redirect: false })
        

        if( result.error ) {
            setErrorMessage(result.error)
        } else {
            router.push('/');
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
        <div className="form-signin-wrapper">
            <main className="form-signin">
                {
                    errorMessage &&  (
                        <div className="alert alert-danger" role="alert">
                            { errorMessage }
                        </div>
                    )
                }

                <form onSubmit={signInUser}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                
                    <div className="form-floating">
                        <input type="email" name="email" className="form-control" id="floatingEmail" placeholder="name@example.com"  value={formData.email} onChange={ e => setFormData( { ...formData, email: e.target.value } ) } />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" value={formData.password} onChange={ e => setFormData( { ...formData, password: e.target.value } ) } />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"  /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
    )
}

export default Login