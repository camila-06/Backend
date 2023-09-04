import {model, Schema, Types} from "mongoose";

let collection = 'carts';

let schema = new Schema({
    products: {
        type: [
        {
            product: {type: Types.ObjectId, ref: 'products'},
            quantity: {type: Number, default: 1}
        }   
    ],
    default:[]
    }
});

schema.pre('find', function(){
    this.populate('products.product')
});

const cartModel = model(collection, schema);

export default cartModel;