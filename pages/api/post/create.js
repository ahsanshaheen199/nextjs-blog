import {dbConnect} from "../../../lib/dbConnect";
import multer from "multer";
import nc from "next-connect";
import {getSession} from "next-auth/react";
import Post from "../../../models/post";
import User from "../../../models/user";
import slugify from "slugify";

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads")
        },
        filename: function( req, file, cb ) {
            cb(null, new Date().getTime() + "-" + file.originalname )
        }
    })
})

const handler = nc({

})
    .use( upload.single('image')  )
    .post( async (req, res ) => {
        try {
            const session = await getSession({req})

            if( ! session  ) {
                res.status(403).json({ message: "Access denied" })
            } else {
                await dbConnect();

                const userEmail = session.user.email

                const userDoc = await User.findOne({ email: userEmail  })

                const { title, details } = req.body

                const slug = slugify(title,{
                    remove: /[*+~.()'"!:@]/g
                });

                const post = new Post( { title, details, slug, user: userDoc._id, image: req.file.filename } )

                await post.save();

                res.status(201).json({
                    message: "Post Created Successfully"
                })
            }
        } catch (error) {
            res.status( 400 ).json({
                message: error.message
            })
        }
    })

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
}