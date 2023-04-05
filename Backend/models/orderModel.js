const {Cosmos} = require('node-cosmos')
const config = require('../config')

class Order{
    constructor() {
      this.db = null
      }
    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }
    async CreateOrder(order){
      try{
          let r = await this.db.upsert("Order", order)
          const products = await this.db.find("Product", {
            filter:{
              id: order.productId
            }
          })
          let p = products[0]
          p.quantity -= order.quantity
          await this.db.upsert("Product", p)
          return r
      }
      catch(err){
        console.log(err.message)
      }
    }

    async UpdateOrder(orderId){
      const orders = await this.db.find("Order", {
        filter:{
          id: orderId
        }
      })
      let o = orders[0]
      o.status = "sent"

      await this.db.upsert("Order", o)
      return o
    }

    async GetAllOrdersForCustomer(customerid){
      const orders = await this.db.find("Order", {
        filter:{
          buyerId: customerid
        }
      })
      return orders
    }

    async GetAllOrdersForSeller(sellerid){
      const orders = await this.db.find("Order", {
        filter:{
          sellerId: sellerid
        }
      })
      return orders
    }

}

const order = new Order()
order.initializeDB()

module.exports = order