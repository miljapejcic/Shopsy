// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

require('dotenv').config({path: __dirname + '/.env'})


const express = require('express');
const cors = require('cors')



const SellerController = require('./controllers/sellerController')
const Seller = require('./models/sellerModel')



 const CosmosClient = require('@azure/cosmos').CosmosClient
 const config = require('./config')



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())



const cosmosClient = new CosmosClient({
    endpoint: config.endpoint,
    key: config.primaryKey
  })
  const seller = new Seller(cosmosClient, "Shopsy", "Seller")
  const sellerContr = new SellerController(seller)


  seller
    .init(err => {
      console.error(err)
    })
    .catch(err => {
      console.error(err)
      console.error(
        'Shutting down because there was an error settinig up the database.'
      )
      process.exit(1)
    })

sellerContr.getItem("1")


app.listen(3000, ()=>{
    console.log('server is listening on port 3000...')
})