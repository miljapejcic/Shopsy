const express = require('express');
const router = express.Router();


const { CreateOrder,
        UpdateOrder,
        FinishOrder,
        GetAllOrdersForCustomer,
        GetAllOrdersForSeller,
        GetRecommendations
} = require('../controllers/orderController');


router.post('/CreateOrder', CreateOrder )
router.put('/UpdateOrder/:orderId', UpdateOrder )
router.put('/FinishOrder/:orderId', FinishOrder )
router.get('/GetAllOrdersForCustomer/:customerId', GetAllOrdersForCustomer )
router.get('/GetAllOrdersForSeller/:sellerId', GetAllOrdersForSeller )
router.get('/GetRecommendations/:buyerId', GetRecommendations)

module.exports = router