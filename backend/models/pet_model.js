import mongoose, { mongo } from "mongoose";

const petsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    species:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    petid:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Pet = mongoose.model('Pet', petsSchema);
export default Pet;