import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import productsRouter from "./routers/products";
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";
import config from "./config";
import reviewsRouter from "./routers/reviews";

const app = express();

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

run().catch(console.error);

