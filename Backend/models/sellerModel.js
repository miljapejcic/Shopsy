const {Cosmos} = require('node-cosmos')
const config = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('../token')
let client = require('../gremlin.js')


class Seller{
    constructor() {
      this.db = null
      }
    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }

    async RegisterSeller(user){
      try{
        const u = await this.db.find("Seller", {
          filter:{
            username : user.username
          }
        })
        let sendInfo = {}
        console.log(u)
        if(Object.keys(u).length == 0){
          await this.db.upsert("Seller", user)
          client.submit("g.addV(label).property('id', id).property('rating', rating).property('userId', id)", {
            label:"Seller",
            id:user.id,
            rating:user.rating
          })
          let token = jwt.createToken(user.id)
          sendInfo = {
            status:200,
            token: token,
            id: user.id,
            tip:"Seller"
        }
      }
      else{
        sendInfo = {
          status:401
      }
      }
      return sendInfo
      }
      catch(err){
        console.log(err.message)
      }
    }

    async LoginSeller(username, password){
      const users = await this.db.find("Seller", {
        filter:{
          username: username
        }
      })
      let result = {}
      if(users.length == 1){
        const u = users[0]
        console.log(password)
        console.log(u)
        const auth = await bcrypt.compare(password, u.password);
        if (auth){
            let token = jwt.createToken(u.id)
            result.sendInfo = {
                id: u.id,
                token:token,
                tip:"Seller"
            }
            result.status = 200
        }
        else{
            result.status = 401
        }
      }
      else{
        result.status = 404
      }
      return result
    }

    async GetSellerById(id){
      let users = await this.db.find("Seller", {
        filter:{
          id: id
        }
      })
      let products = await this.db.find("Product", {
        filter:{
          sellerId: id,
          "quantity >=": 1
        }
      })
      users[0].products = products
      return users[0]
    }

    async GetAllSellers(){
      const users = await this.db.findBySQL("Seller", "SELECT * from c");
      return users
    }

    async UpdateSeller(id, info){
      const users = await this.db.find("Seller", {
        filter:{
          id: id
        }
      })
      let user = users[0]
      user.owner = info.owner;
      user.store = info.store;
      console.log(user)
      await this.db.upsert("Seller", user)
      console.log(user)
      return user
    }

    async RateSeller(id, info){
      const users = await this.db.find("Seller", {
        filter:{
          id: id
        }
      })
      let user = users[0]
      let noviRating = user.NoR != 0 ? (user.rating*user.NoR)+info.rating : info.rating;
      user.NoR +=1;
      user.rating = noviRating / user.NoR;
      console.log(user)
      await this.db.upsert("Seller", user)

      client.submit("g.V().has('id', id).property('rating', newValue)", {
        id:id,
        newValue: noviRating / user.NoR
      })

      console.log(user)
      return user
    }

    async ListAllSellersFromCategory(category){
      const products = await this.db.find("Product", {
        filter:{
          category: category
        }
      })
      let filteredsellerids = [...new Set(products.map(item => item.sellerId))];
      const quotedids = filteredsellerids.map(str => `'${str}'`);
      let  query = quotedids.join(",");
      const sellers = await this.db.findBySQL("Seller",`SELECT * FROM c WHERE c.id IN (${query})`);
      return sellers
    }

}

const seller = new Seller()
seller.initializeDB()

module.exports = seller