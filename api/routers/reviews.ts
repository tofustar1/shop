import express from "express";
import auth from "../middleware/auth";
import mongoose from "mongoose";
import Review from "../models/Review";
import {RequestWithUser} from "../types";

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find({product: req.query.product});
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const review = await Review.create({
      user: user._id,
      product: req.body.product,
      text: req.body.text,
      review: req.body.review,
    });

    res.send(review);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({error: error.message});
    }
    res.sendStatus(500);
  }
});

reviewsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const review = await Review.findOne({_id: req.params.id});
    if (!review) {
      return res.status(404).send({error: 'No review with this id'});
    }

    if (review.user.toString() === user._id.toString() || user.role === 'admin') {
      await Review.deleteOne({_id: req.params.id});
    } else {
      return res.status(403).send({error: 'Unauthorized'});
    }

    res.status(204).send();
  } catch (error) {
    next(error)
  }
});

export default reviewsRouter;