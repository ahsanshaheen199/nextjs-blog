import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React from 'react'

const Profile = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/login');
        }
    });

    const router = useRouter();

    if( status === 'loading' ) {
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
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Welcome { session.user.name }</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile