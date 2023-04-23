const {Cosmos} = require('node-cosmos')
const config = require('../config')
let client = require('../gremlin.js')


class Product{
    constructor() {
      this.db = null
    }

    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }

    async CreateProduct(p){
      console.log("uso u createproduct")
      try{
        let r = await this.db.upsert("Product", p)
        client.submit("g.addV(label).property('id', id).property('category', category).property('price', price).property('quantity', quantity).property('rating', rating).property('userId', sellerId)", {
          label:"Product",
          id:p.id,
          price: p.price,
          quantity:p.quantity,
          category:p.category,
          rating:p.rating,
          sellerId: p.sellerId
        }).then(function (result) {
                console.log("Result: %s\n", JSON.stringify(result));
        });
        client.submit("g.V(source).addE(relationship).to(g.V(target))", {
          source:p.sellerId,
          relationship:"sells", 
          target:p.id 
        }).then(function (result) {
          console.log("Result: %s\n", JSON.stringify(result));
        });
        client.submit("g.V(source).addE(relationship).to(g.V(target))", {
          source:p.id,
          relationship:"from", 
          target:p.sellerId, 
        }).then(function (result) {
          console.log("Result: %s\n", JSON.stringify(result));
        });
        let sendInfo={
          status:200,
          product: r
        }
        return sendInfo
      }
      catch(err){
        console.log(err)
      }
    }

    async UpdateProduct(id, info){
      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
      let p = products[0]
      p.name= info.name
      p.description = info.description
      p.quantity = info.quantity
      p.price = info.price

      client.submit("g.V().hasLabel('Product').has('id', id).property('price', newPrice).property('quantity', newQuantity)", {
        id: id,
        newPrice:info.price,
        newQuantity:info.quantity
      })

      await this.db.upsert("Product", p)
      return p
    }

    async GetProductById(id){
      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
      console.log(products)
      return products[0]
    }

    async RateProduct(id, info){
      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
      let p = products[0]
      let noviRating = p.NoR != 0 ? (p.rating*p.NoR)+info.rating : info.rating;
      p.NoR +=1;
      p.rating = noviRating / p.NoR;
      await this.db.upsert("Product", p)
      client.submit("g.V().hasLabel('Product').has('id', id).property('rating', newValue)", {
        id:id,
        newValue: noviRating / p.NoR
      })
      return p
    }

    async GetAllProductsForSeller(sellerid){
      console.log(sellerid)
      const products = await this.db.find("Product", {
        filter:{
          sellerId: sellerid
        }
      })
      console.log(products)
      return products
    }

    async GetAllProducts(){
      const products = await this.db.findBySQL("Product", "SELECT * from c WHERE c.quantity >= 1");
      return products
    }

    async ListAllProductsFromCategory(c){
      const products = await this.db.find("Product", {
        filter:{
          category: c,
          "quantity >=": 1
        }
      })
      return products
    }

}

const product = new Product()
product.initializeDB()

module.exports = product