
const Signup = () => {
    return (
        <div className="form-signup-wrapper">
            <main className="form-signup">
                <form>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingName" placeholder="john doe" />
                        <label htmlFor="floatingName">Full name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
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