const {Cosmos} = require('node-cosmos')
const config = require('../config')

class Order{
    constructor() {
      this.db = null
      }
    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }
    async createOrder(order){
      try{
          return await this.db.upsert("Order", order)
      }
      catch(err){
        console.log(err.message)
      }
    }

}

const order = new Order()
order.initializeDB()

module.exports = order