const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const { CreateProduct,
        UpdateProduct,
        GetProductById,
        RateProduct,
        UploadPhoto,
        DeleteProduct,
        GetAllProducts,
        ListAllProductsFromCategory,
        ListAllProductsForSeller
 } = require('../controllers/productController');


router.post('/CreateProduct', CreateProduct )
router.put('/UpdateProduct/:id', UpdateProduct )
router.get('/GetProductById/:id', GetProductById )
router.delete('/DeleteProduct/:id', DeleteProduct )
router.put('/RateProduct/:id', RateProduct)
router.get('/GetAllProducts', GetAllProducts )
router.post('/UploadPhoto/:productId',upload.single('image'), UploadPhoto)
router.post('/ListAllProductsFromCategory', ListAllProductsFromCategory )
router.get('/ListAllProductsForSeller/:sellerId', ListAllProductsForSeller )

module.exports = router