import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Header = () => {
    const { data: session, status } = useSession();
    return (
        <div className="container">
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-4 pt-1">
                    <Link href="/profile">
                        <a className="link-secondary">{ session ? session.user.name : 'Welcome Guest' }</a>
                    </Link>
                </div>
                <div className="col-4 text-center">
                    <Link href="/">
                        <a className="blog-header-logo text-dark">Nextjs Blog</a>
                    </Link>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <a className="link-secondary" href="#" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
                    </a>    

                    {
                        ( ! session && 'loading' !== status ) && (
                            <>
                                <Link href="/login">
                                    <a className="btn btn-sm btn-outline-secondary mx-3">Sign in</a>
                                </Link>
                                <Link href="/signup">
                                    <a className="btn btn-sm btn-outline-secondary">Sign up</a>
                                </Link>
                            </>
                        )
                    }

                    {
                        session && (
                            <a onClick={ () => signOut({redirect: false}) } className="btn btn-sm btn-outline-secondary ms-3">Logout</a>
                        )
                    }
                    
                    
                </div>
                </div>
            </header>
        </div>
    )
}

export default Header