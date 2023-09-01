import {model, Schema} from "mongoose";

let collection = 'products';

let schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
	code: {type: String, required: true, unique: true},
	price: {type: Number, required: true},
	stock: {type: Number, required: true},
	category: {type: String, required: true},
	status: {type: Boolean, default: true}
});

const productModel = model(collection, schema);

export default productModel;