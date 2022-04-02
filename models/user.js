import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', UserSchema);

