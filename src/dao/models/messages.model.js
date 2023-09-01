import {model, Schema} from "mongoose";

let collection = 'message';

let schema = new Schema({
    user: {type: String, required: true},
    message: {type: String, required: true}
});

const messageModel = model(collection, schema);

export default messageModel;