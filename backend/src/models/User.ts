import mongoose from "mongoose";
import type { IUser } from "../types/Models.ts"

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        max: 100,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 100,
        min: 3
    },
    password: {
        type: String,
        required: true,
        max: 256,
        min: 6
    }
})

const User = mongoose.model("User", UserSchema);

export default User;