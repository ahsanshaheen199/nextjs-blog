import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcrypt";
import { dbConnect } from "../../../lib/dbConnect";

import User from '../../../models/user';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {

                try {
                    const { email, password } = credentials

                    if( !email ) {
                        throw new Error( "Email is required" );
                    }
                    
                    await dbConnect();

                    const userDoc = await User.findOne({ email }).exec();

                    if( ! userDoc ) {
                        throw new Error( "User not exists" );
                    }

                    const isMatched = await bycrypt.compare(password, userDoc.password);

                    if( userDoc && isMatched ) {
                        return { email: userDoc.email, name: userDoc.name };
                    } else {
                        throw new Error( "Email or password incorrect" );
                    }

                } catch( error ) {
                    throw new Error( error.message )
                }
                

            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async session({ session, user, token }) {
            return session;
        },
        async token({ token, user, account, profile, isNewUser }) {
            console.log("token", { user, token });
            return token;
        }
    }
})