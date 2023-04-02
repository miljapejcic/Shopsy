const {Cosmos} = require('node-cosmos')
const config = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('../token')

class Customer{
    constructor() {
      this.db = null
      }
    async initializeDB(){
      this.db = await new Cosmos(config.conString).getDatabase("Shopsy");
    }

    async RegisterCustomer(user){
      try{
        const u = await this.db.find("Customer", {
          filter:{
            username : user.username
          }
        })
        let sendInfo = {}
        console.log(u)
        if(Object.keys(u).length == 0){
          await this.db.upsert("Customer", user)
          let token = jwt.createToken(user.id)
          sendInfo = {
            status:200,
            token: token,
            id: user.id,
            tip:"Buyer"
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

    async LoginCustomer(username, password){
      const users = await this.db.find("Customer", {
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
                tip:"Buyer"
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

    async GetCustomerById(id){
      const users = await this.db.find("Customer", {
        filter:{
          id: id
        }
      })
      return users[0]
    }

    async UpdateCustomer(id, info){
      const users = await this.db.find("Customer", {
        filter:{
          id: id
        }
      })
      let user = users[0]
      user.name = info.name;
      console.log(user)
      await this.db.upsert("Customer", user)
      console.log(user)
      return user
    }

}

const customer = new Customer()
customer.initializeDB()

module.exports = customer