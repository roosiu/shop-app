const express = require('express');

//wyciągam router z express
const router = express.Router();

//importuję middleware sprawdzającego JWT
const checkAuth = require('../middleware/check-auth.cjs');

//importuję kontoler
const ProductController = require('../controllers/products.cjs');

// /products GET
// lista wszystkich produktów
router.get('/', ProductController.products_get_all);

// /products/1  GET
// szczegóły produktu o numerze 1
router.get('/:productId', ProductController.products_get_by_id);

// /products POST
// dodanie nowego produktu
router.post('/', checkAuth, ProductController.products_add);

// /products/1 PUT
// zmiana danych produktu o numerze 1
router.put('/:productId', checkAuth, ProductController.products_change);

// /products/1 DELETE
// usunięcie produktu o numerze 1
router.delete('/:productId', checkAuth, ProductController.products_delete);

module.exports = router;
