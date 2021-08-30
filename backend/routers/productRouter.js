import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import Product from '../models/productModel';

const productRouter = express.Router();
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'voorbeeld product',
      description: 'voorbeeld beschr',
      category: 'voorbeeld categorie',
      brand: 'voorbeeld merk',
      image: '/images/product-1.jpg',
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: 'Product gemaakt', product: createdProduct });
    } else {
      res.status(500).send({ message: 'Fout bij het maken van product' });
    }
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product bijgewerkt', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Fout bij updaten van product' });
      }
    } else {
      res.status(404).send({ message: 'Product niet gevonden' });
    }
  })
);
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product verwijderd', product: deletedProduct });
    } else {
      res.status(404).send({ message: 'Product niet gevonden' });
    }
  })
);

export default productRouter;
