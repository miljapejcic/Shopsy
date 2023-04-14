const express = require('express');
const router = express.Router();


const { RegisterSeller,
        LoginSeller,
        GetSellerById,
        GetAllSellers,
        UpdateSeller,
        RateSeller,
        ListAllSellersFromCategory
//         DeleteSeller
} = require('../controllers/sellerController');


router.post('/RegisterSeller', RegisterSeller)
router.post('/LoginSeller', LoginSeller)
router.get('/GetSellerById/:id', GetSellerById)
router.get('/GetAllSellers', GetAllSellers)
router.put('/UpdateSeller/:id', UpdateSeller)
router.put('/RateSeller/:id', RateSeller)
router.post('/ListAllSellersFromCategory', ListAllSellersFromCategory)
// router.delete('/DeleteSeller/:id', DeleteSeller)

module.exports = router