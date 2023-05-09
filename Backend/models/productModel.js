const {Cosmos} = require('node-cosmos')
const config = require('../config')
let client = require('../gremlin.js')
const containerClient = require('../blobstorage.js')

class Product{
    constructor() {
      this.db = null
    }

    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }

    async CreateProduct(p){
      try{
        let r = await this.db.upsert("Product", p)
        await client.submit("g.addV(label).property('id', id).property('category', category).property('price', price).property('quantity', quantity).property('rating', rating).property('userId', sellerId)", {
          label:"Product",
          id:p.id,
          price: p.price,
          quantity:p.quantity,
          category:p.category,
          rating:p.rating,
          sellerId: p.sellerId
        }).then(async function (result) {
            await client.submit("g.V(source).addE(relationship).to(g.V(target))", {
              source:p.sellerId,
              relationship:"sells", 
              target:p.id 
            }).then(async function (result) {
              await client.submit("g.V(source).addE(relationship).to(g.V(target))", {
                source:p.id,
                relationship:"from", 
                target:p.sellerId, 
              })
            });
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

    async UploadPhoto(id, photo){
      const filename = `${id}`;
      const blobClient = containerClient.getBlockBlobClient(filename);
      const options = { blobHTTPHeaders: { blobContentType: photo.mimetype } };
      await blobClient.uploadData(photo.buffer, options);
      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
      let p = products[0]
      p.photo= blobClient.url
      await this.db.upsert("Product", p)
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

    async DeleteProduct(id){
      let sendInfo = {
        status:0,
        text:""
      }
      let res = await client.submit("g.V().hasLabel('Product').has('id', id).inE('has').outV().hasLabel('Order').has('status', within('sent', 'pending'))", {
        id:id
      })
      if(res.length > 0){
        sendInfo.status = 409
        sendInfo.text = "Unable to delete product until all the product orders have been received!"
        return sendInfo
      }
      const filename = `${id}`;
      const blobClient = containerClient.getBlockBlobClient(filename);
      await blobClient.delete();

      await client.submit("g.V().hasLabel('Product').has('id', id).inE('has').outV().hasLabel('Order').drop()", {
        id:id
      }).then(async ()=>{
        await client.submit("g.V().hasLabel('Product').has('id', id).drop()", {
          id:id
        })
      })

      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
      let result = await this.db.delete("Product", id, products[0].category);

      sendInfo.status = 200
      sendInfo.text = "Product deleted successfully!"
      return sendInfo
    }

    async GetProductById(id){
      const products = await this.db.find("Product", {
        filter:{
          id: id
        }
      })
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
      const products = await this.db.find("Product", {
        filter:{
          sellerId: sellerid
        },
      })
      return products
    }

    async GetAllProducts(){
      const products = await this.db.findBySQL("Product", "SELECT * from c WHERE c.quantity >= 1 ORDER BY c.rating DESC");
      return products
    }

    async ListAllProductsFromCategory(c){
      const products = await this.db.find("Product", {
        filter:{
          category: c,
          "quantity >=": 1
        },
        sort: ["rating", "DESC"],
      })
      return products
    }

}

const product = new Product()
product.initializeDB()

module.exports = product