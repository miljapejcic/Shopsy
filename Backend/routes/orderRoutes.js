const express = require('express');
const router = express.Router();


const { CreateOrder,
        UpdateOrder,
        GetAllOrdersForCustomer,
        GetAllOrdersForSeller
} = require('../controllers/orderController');


router.post('/CreateOrder', CreateOrder )
router.put('/UpdateOrder/:orderId', UpdateOrder )
router.get('/GetAllOrdersForCustomer/:customerId', GetAllOrdersForCustomer )
router.get('/GetAllOrdersForSeller/:sellerId', GetAllOrdersForSeller )

module.exports = router