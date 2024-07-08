//importuję model produktu
const Product = require('../models/product.cjs');

exports.products_get_all = (req, res, next) => {
  Product.find().then((result) => {
    res
      .status(200)
      .json({ message: 'lista wszystkich produktów', info: result });
  });
};

exports.products_get_by_id = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).then((result) => {
    res
      .status(200)
      .json({ message: 'szczegóły produktu o numerze ' + id, info: result });
  });
};

exports.products_add = (req, res, next) => {
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product.save().then((result) => {
    res.status(201).json({ message: 'dodanie nowego produktu', result });
  });
};

exports.products_change = (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndUpdate(id, {
    name: req.body.name,
    price: req.body.price,
  }).then(() => {
    res.status(200).json({ message: 'zmiana danych produktu o numerze ' + id });
  });
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndDelete(id).then(() => {
    res.status(200).json({ message: 'usunięcie produktu o numerze ' + id });
  });
};