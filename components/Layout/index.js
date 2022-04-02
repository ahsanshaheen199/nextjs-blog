import Head from "next/head"
import Header from "../Header"

const Layout = ( { children } ) => {
    return (
        <>
            <Head>
                <link href="https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />

                <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet" />
            </Head>
            <Header />
            { children }
        </>
    )
}

export default Layout