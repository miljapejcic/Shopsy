const express = require('express');
const router = express.Router();


const { RegisterSeller,
        LoginSeller,
        GetSellerById,
        GetAllSellers,
        UpdateSeller,
        ListAllSellersFromCategory
} = require('../controllers/sellerController');


router.post('/RegisterSeller', RegisterSeller)
router.post('/LoginSeller', LoginSeller)
router.get('/GetSellerById/:id', GetSellerById)
router.get('/GetAllSellers', GetAllSellers)
router.put('/UpdateSeller/:id', UpdateSeller)
router.post('/ListAllSellersFromCategory', ListAllSellersFromCategory)

module.exports = router