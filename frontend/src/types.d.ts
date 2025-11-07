export interface Category {
  _id: string;
  title: string;
  description: string | null;
}

export interface Product {
  _id: string;
  category: Category;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
}

export interface ProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
    message: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}
