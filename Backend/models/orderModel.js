const {Cosmos} = require('node-cosmos')
const config = require('../config')
let client = require('../gremlin.js')
const product = require('../models/productModel')

class Order{
    constructor() {
      this.db = null
      }
      async initializeDB(){
        this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
      }

    async CreateOrder(order){
      try{
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
            })
              
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
          return sendInfo
        })
      }
      catch(err){
        console.log(err.message)
      }
    }

    async UpdateOrder(orderId){
      let order
      await client.submit("g.V().hasLabel('Order').has('id', id).property('status', newValue)", {
        id:orderId,
        newValue: "sent"
      })
      await client.submit("g.V().hasLabel('Order').has('id', id)", {
        id:orderId
      }).then(function (result) {
        order = {
          id:result._items[0].id,
          status: result._items[0].properties.status[0].value,
          price: result._items[0].properties.price[0].value
        }
      });
      await client.submit("g.V().hasLabel('Order').has('id', id).outE('has')", {
        id:orderId
      }).then(function (result) {
        order.quantity = result._items[0].properties.quantity
      });
      return order
    }

    async FinishOrder(orderId){
      let order
      await client.submit("g.V().hasLabel('Order').has('id', id).property('status', newValue)", {
        id:orderId,
        newValue: "archived"
      })
      await client.submit("g.V().hasLabel('Order').has('id', id)", {
        id:orderId
      }).then(function (result) {
        order = {
          id:result._items[0].id,
          status: result._items[0].properties.status[0].value,
          price: result._items[0].properties.price[0].value
        }
      });
      await client.submit("g.V().hasLabel('Order').has('id', id).outE('has')", {
        id:orderId
      }).then(function (result) {
        order.quantity = result._items[0].properties.quantity
      });
      return order
    }


    async GetAllOrdersForCustomer(customerid) {
      let orders;
      await client.submit("g.V().has('Buyer', 'id', customerid).out('bought').has('status', neq('archived')).as('order').project('orderId', 'price', 'status').by(id).by('price').by('status')", {
        customerid: customerid
      }).then(async (result) => {
        orders = result.toArray();
        const promises = orders.map(async (order) => {
          const res = await client.submit("g.V().hasLabel('Order').has('id', id).outE('has').valueMap()", {
            id: order.orderId
          });
          order.quantity = res.toArray()[0].quantity;
          const prod = await client.submit("g.V().hasLabel('Order').has('id',id).outE('has').inV()", {
            id: order.orderId
          });
          let productId= prod.toArray()[0].id;
          const product = await this.db.find("Product", {
            filter:{
              id: productId
            }
          })
          order.product = product[0]
        });
        await Promise.all(promises);
      });
      return orders;
    }
    

    async GetAllOrdersForSeller(sellerid){
      let orders;
      await client.submit("g.V().has('Seller', 'id', sellerid).out('sells').in('has').has('status', neq('archived')).as('order').project('orderId', 'price', 'status').by(id).by('price').by('status')", {
        sellerid: sellerid
      }).then(async (result) => {
        orders = result.toArray();
        const promises = orders.map(async (order) => {
          const res = await client.submit("g.V().hasLabel('Order').has('id', id).outE('has').valueMap()", {
            id: order.orderId
          });
          order.quantity = res.toArray()[0].quantity;
          const prod = await client.submit("g.V().hasLabel('Order').has('id',id).outE('has').inV()", {
            id: order.orderId
          });
          let productId= prod.toArray()[0].id;
          const product = await this.db.find("Product", {
            filter:{
              id: productId
            }
          })
          order.product = product[0]
        });
        await Promise.all(promises);
      });
      return orders;
    }

    async GetRecommendations(buyerId){
      let sendInfo = {
        products:[],
        category:""
      }
      await client.submit("g.V().has('Order', 'userId', id).out('has').group().by('category')", {
        id:buyerId
      }).then(async function (result) {
        let categories = result._items[0]
        sendInfo.category = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);
        await product.ListAllProductsFromCategory(sendInfo.category).then(result=>{
          sendInfo.products = result
        })
      });
      return sendInfo
    }

}

const order = new Order()
order.initializeDB()

module.exports = order