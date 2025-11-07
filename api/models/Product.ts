import mongoose from "mongoose";
import Category from "./Category";
import {ProductFields} from "../types";

const Schema = mongoose.Schema;

const ProductSchema = new Schema<ProductFields>({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist'
    }
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  image: String
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;