const express = require('express');
const router = express.Router();


const { CreateProduct,
        UpdateProduct,
        GetProductById,
        RateProduct,
//         DeleteProduct,
        GetAllProducts,
//         ListAllProductsBcRating,
        ListAllProductsFromCategory,
        ListAllProductsForSeller
 } = require('../controllers/productController');


router.post('/CreateProduct', CreateProduct )
router.put('/UpdateProduct/:id', UpdateProduct )
router.get('/GetProductById/:id', GetProductById )
// router.delete('/DeleteProduct/:id', DeleteProduct )
router.put('/RateProduct/:id', RateProduct)
router.get('/GetAllProducts', GetAllProducts )
// router.get('/ListAllProductBcRating', ListAllProductsBcRating )
router.post('/ListAllProductsFromCategory', ListAllProductsFromCategory )
router.get('/ListAllProductsForSeller/:sellerId', ListAllProductsForSeller )

module.exports = router