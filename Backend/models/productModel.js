const {Cosmos} = require('node-cosmos')
const config = require('../config')

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