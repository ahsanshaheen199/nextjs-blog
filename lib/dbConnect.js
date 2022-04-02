import mongoose from "mongoose";

global.mongoose = {
    conn: null,
    promise: null
}

export async function dbConnect() {
    if( global.mongoose && global.mongoose.conn ) {
        return global.mongoose.conn;
    } else {
        const username = process.env.MONGODB_USER
        const password = process.env.MONGODB_PASSWORD
        const database = process.env.MONGODB_DATABASE
        const uri = `mongodb+srv://${username}:${password}@cluster0.njvx9.mongodb.net/${database}?retryWrites=true&w=majority`;
        const promise = await mongoose.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true
        })

        global.mongoose = {
            conn: promise,
            promise
        }

        return promise;
    }

}
