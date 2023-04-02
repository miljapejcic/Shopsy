require('dotenv').config({path: __dirname + '/.env'})

//osnovni deo
const express = require('express');
const cors = require('cors')

//rute
const sellerRoute = require('./routes/sellerRoutes')
const customerRoute = require('./routes/customerRoutes')
const orderRoute = require('./routes/orderRoutes')
const productRoute = require('./routes/productRoutes')



//osnovni deo
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())


//namestanje ruta
app.use('/api/seller', sellerRoute)
app.use('/api/customer', customerRoute)
app.use('/api/order', orderRoute)
app.use('/api/product', productRoute)



app.listen(3000, ()=>{
    console.log('server is listening on port 3000...')
})
