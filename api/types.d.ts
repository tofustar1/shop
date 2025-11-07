import {Request} from "express";
import {HydratedDocument} from "mongoose";

export interface ProductFields {
  category: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface CategoryFields {
  title: string;
  description: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleId?: string;
}

export interface ReviewFields {
  user: Types.ObjectId;
  product: Types.ObjectId;
  text: string;
  review: number;
}

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserFields>
}