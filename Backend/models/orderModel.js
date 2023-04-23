const {Cosmos} = require('node-cosmos')
const config = require('../config')
let client = require('../gremlin.js')

class Order{
    constructor() {
      this.db = null
      }
      async initializeDB(){
        this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
      }

    async CreateOrder(order){
      try{
        console.log("OVO JE ORDER")
        console.log(order)
        let sendInfo
        let q = 0
        let newDb = this.db
        await client.submit("g.V().hasLabel('Product').has('id', id).valueMap('quantity')", {
          id:order.productId 
        }).then(async function (result) {
          q = result._items[0].quantity[0]
          if(q >= order.quantity)
          {
            //novi Order cvor
            await client.submit("g.addV(label).property('id', id).property('status', status).property('userId', buyerId)", {
              label:"Order",
              id:order.id,
              status:"pending",
              buyerId: order.buyerId
            }).then(function (result) {
                    console.log("Result: %s\n", JSON.stringify(result));
            });
              
            //veza izmedju ordera i buyer
            await client.submit("g.V(source).addE(relationship).to(g.V(target))", {
              target:order.id, 
              relationship:"bought", 
              source:order.buyerId
            })
  
            //veza izmedju ordera i producta (ima property quantity)
            await client.submit("g.V(source).addE(relationship).to(g.V(target)).property('quantity', quantity)", {
              source:order.id, 
              relationship:"has", 
              target:order.productId,
              quantity: order.quantity
            })
  
            //racunanje price za order
            let productPrice
            let productQuantity
            await client.submit("g.V().hasLabel('Product').has('id', id).valueMap('price', 'quantity')", {
              id:order.productId 
            }).then(async function (result) {
              console.log("OVO je cena")
              productPrice = result._items[0].price[0]
              productQuantity = result._items[0].quantity[0]
              await client.submit("g.V().has('id', id).property('price', newValue)", {
                id:order.id,
                newValue: productPrice*order.quantity
              }).then(async function (result) {
                await client.submit("g.V().has('Product', 'id', id).property('quantity', newQuantity)", {
                  id:order.productId,
                  newQuantity:productQuantity-order.quantity
                })
  
                const products = await newDb.find("Product", {
                  filter:{
                    id: order.productId
                  }
                })
                let p = products[0]
                p.quantity = p.quantity - order.quantity
      
                await newDb.upsert("Product", p)

              });
            });

  
            sendInfo={
              status:200,
              res: order
            }
          }
          else
          {
            sendInfo={
              status:500,
              res:null
            }
          }
          console.log("OVO JE SENDINFO")
          console.log(sendInfo)
          return sendInfo
        })
      }
      catch(err){
        console.log(err.message)
      }
    }

    async UpdateOrder(orderId){
      return client.submit("g.V().hasLabel('Order').has('id', id).property('status', newValue)", {
        id:orderId,
        newValue: "sent"
      }).then(function (result) {
        console.log("Result: %s\n", JSON.stringify(result));
      });
      // return order
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