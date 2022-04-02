import bcrypt from "bcrypt";
import { dbConnect } from "../../../lib/dbConnect";
import User from "../../../models/user";

export default async function handler( req, res ) {
    if (req.method !== 'POST') {
        res.status( 400 ).json({
            errorMessage: "Invalid request type"
        })
        return;
    }

    if( req.method === 'POST' ) {
        try {
            const { name, email, password }  = req.body;

            const hashPassword = await bcrypt.hash( password, 8 );

            await dbConnect();

            const user = new User( { name, email, password: hashPassword } );

            const savedUser = await user.save();

            res.status( 201 ).json({
                message: "User created succesfully"
            })

        } catch( error ) {
            res.status( 400 ).json({
                message: error.message
            })
        }
    }
}