const {Cosmos} = require('node-cosmos')
const config = require('../config')

class Product{
    constructor() {
      this.db = null
      }
    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }

}

const product = new Product()
product.initializeDB()

module.exports = product