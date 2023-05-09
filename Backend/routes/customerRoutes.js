const express = require('express');
const router = express.Router();


const { RegisterCustomer,
        LoginCustomer,
        GetCustomerById,
        UpdateCustomer,
} = require('../controllers/customerController');


router.post('/RegisterCustomer', RegisterCustomer)
router.post('/LoginCustomer', LoginCustomer)
router.get('/GetCustomerById/:id', GetCustomerById)
router.put('/UpdateCustomer/:id', UpdateCustomer)

module.exports = router