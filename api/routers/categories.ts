import express from "express";
import Category from "../models/Category";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch {
    res.sendStatus(500);
  }
});

categoriesRouter.post("/", auth, permit('admin'), async (req, res) => {
  try {
    const category = await Category.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.send(category);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({error: error.message});
    }

    res.sendStatus(500);
  }
});

export default categoriesRouter;