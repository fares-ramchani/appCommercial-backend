import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum: ["admin", "superadmin"]
    },
    admins : [{
        type : String,
    }]
});

const User = model("User", userSchema);

export default User
