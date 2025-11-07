import express from "express";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).populate('category', 'title description');
    res.send(products);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'title description');

    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }

    res.send(product);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res) => {

  try {
    const product = await Product.create({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null
    });

    res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({error: error.message});
    }
    res.sendStatus(500);
  }
});

export default productsRouter;