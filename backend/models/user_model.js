import mongoose, { mongo } from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    pass:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const User = mongoose.model('User', usersSchema);
export default User;