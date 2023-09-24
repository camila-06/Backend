import { model, Schema } from "mongoose";

let collection = 'users';

let schema = new Schema({
    name: {type: String, required: true},
    photo: {type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'},
    mail: {type: String, unique: true, index: true, required: true},
    age: {type: Number},
    role: {type: String, default: 0},
    password: {type: String, required: true}
})

const userModel = model(collection, schema);

export default userModel;