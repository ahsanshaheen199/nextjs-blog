import Head from "next/head";
import { useRef, useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react";

function Create() {
    const [ formData, setFormData ] = useState({
        title: "",
        details: "",
        file: {}
    });
    const [ imageUrl, setImageUrl ] = useState(null);
    const [formLoading, setFormLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const router = useRouter();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/login');
        }
    });

    const imageRef = useRef()

    const handleImage = ( event ) => {
        const file = event.target.files[0];
        setFormData( { ...formData, file } )
        const reader = new FileReader();
        reader.onload = function(event) {
            setImageUrl(event.target.result)
        }
        reader.readAsDataURL(file)
    }

    const createPost = async ( event ) => {
        event.preventDefault()
        const formValue = new FormData();
        formValue.append('title', formData.title);
        formValue.append('details', formData.details);
        formValue.append('image', formData.file);
        setFormLoading(true)

        try {
           const result = await axios.post('/api/post/create', formValue)
            setSuccessMessage(result.data.message)
            imageRef.current.value= ""
            setFormData({
                title: "",
                details: "",
                file: {}
            })

            setFormLoading(false)

        } catch( error ){
            setErrorMessage( error.response.data.message );
        }
    }

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
        <div className={`form-post-create-wrapper mt-5`}>
            <Head>
                <title> Create post</title>
            </Head>
            <div className={`container`}>
                <div className={`row justify-content-center`}>
                    <div className={`col-5`}>
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
                        <form onSubmit={createPost}>
                            <div className={`mb-3`}>
                                <label htmlFor={`postTitle`} className={`form-label`}> Title </label>
                                <input id={`postTitle`} className={`form-control`} placeholder={`Enter post title`} name={`title`} value={formData.title} onChange={ (event) => setFormData({...formData, title: event.target.value}) } />
                            </div>
                            <div className={`mb-3`}>
                                <label htmlFor={`postDetails`} className={`form-label`}> Details </label>
                                <textarea id={`postDetails`} name={`details`} placeholder={`Enter post details`} className={`form-control`} value={formData.details} onChange={ (event) => setFormData({ ...formData, details: event.target.value }) }></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`postImage`} className="form-label">Post Image</label>
                                <input ref={imageRef} onChange={handleImage} name={`post-image`} className={`form-control`} type="file" id={`postImage`} />
                            </div>
                            <button type="submit" disabled={formLoading} className="btn btn-primary"> { formLoading ? "Loading...." : "Submit" } </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;