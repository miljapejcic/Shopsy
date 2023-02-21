const seller = require('../models/sellerModel');

class SellerController{
  constructor(seller){
    this.seller = seller;
  }

  async getItem(req,res){
    const item = await this.seller.getItem("1")
    console.log(item)
  }
}

module.exports = SellerController