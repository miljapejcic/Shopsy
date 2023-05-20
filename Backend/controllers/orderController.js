const order = require('../models/orderModel')
const { v4: uuidv4 } = require('uuid')


const CreateOrder = async (req, res) =>{
    try{
          const idv4 = uuidv4().replace(/-/g, '');
          const o = {
            id: idv4,
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            address:req.body.address,
            status: "pending"
          }

          await order.CreateOrder(o).then( (result) =>{
              res.status(200).send(result)
          }).catch(err => res.status(500).send(err.message))   
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
}

const UpdateOrder = async (req, res) =>{
    try{
        await order.UpdateOrder(req.params.orderId).then(result=>{
            res.status(200).send(result)
        })
        }
        catch(err){
        res.status(500).send(err.message)
    }
}

const FinishOrder = async (req, res) =>{
  try{
      await order.FinishOrder(req.params.orderId).then(result=>{
          res.status(200).send(result)
      })
      }
      catch(err){
      res.status(500).send(err.message)
  }
}

const GetAllOrdersForCustomer = async (req, res)=>{
    try{
      await order.GetAllOrdersForCustomer(req.params.customerId).then(result=>{
        res.status(200).send(result)
      })
    }
    catch(err){
      res.status(500).send(err.message)
    }
}

const GetAllOrdersForSeller = async (req, res)=>{
    try{
      await order.GetAllOrdersForSeller(req.params.sellerId).then(result=>{
        res.status(200).send(result)
      })
    }
    catch(err){
      res.status(500).send(err.message)
    }
}

const GetRecommendations = async (req, res)=>{
  try{
    await order.GetRecommendations(req.params.buyerId).then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

module.exports = {  CreateOrder,
                    UpdateOrder,
                    FinishOrder,
                    GetAllOrdersForCustomer,
                    GetAllOrdersForSeller,
                    GetRecommendations
}