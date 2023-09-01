import {model, Schema, Types} from "mongoose";

let collection = 'carts';

let schema = new Schema({
    products: [
        {
            product: {type: Types.ObjectId, ref: 'products'},
            quantity: {type: Number, default: 1}
        }   
    ]
});

const cartModel = model(collection, schema);

export default cartModel;