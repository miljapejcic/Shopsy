const product = require('../models/productModel')
const { v4: uuidv4 } = require('uuid')


const CreateProduct = async (req, res) =>{
    try{
          const idv4 = uuidv4().replace(/-/g, '');
          const p = {
            id: idv4,
            sellerId: req.body.sellerId,
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            photo:"",
            rating:0,
            NoR:0
          }

          await product.CreateProduct(p).then( result =>{
            if(result.status == 200){
              res.status(200).send(result.product)
            }
          }).catch(err => res.status(500).send(err.message))   
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
}

const UpdateProduct = async (req, res) =>{
    try{
        await product.UpdateProduct(req.params.id, req.body).then(result=>{
            res.status(200).send(result)
        })
        }
        catch(err){
        res.status(500).send(err.message)
    }
}

const GetProductById = async (req, res) =>{
    try{
        await product.GetProductById(req.params.id).then(result=>{
        res.status(200).send(result)
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const RateProduct = async (req, res) =>{
    try{
        await product.RateProduct(req.params.id, req.body).then(result=>{
        res.status(200).send(result)
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
}

const ListAllProductsForSeller = async (req, res)=>{
    try{
      await product.GetAllProductsForSeller(req.params.sellerId).then(result=>{
        res.status(200).send(result)
      })
    }
    catch(err){
      res.status(500).send(err.message)
    }
}

const GetAllProducts = async (req, res)=>{
  try{
    await product.GetAllProducts().then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

const ListAllProductsFromCategory = async (req, res)=>{
  try{
    await product.ListAllProductsFromCategory(req.body.category).then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}


module.exports = {  CreateProduct,
                    UpdateProduct,
                    GetProductById,
                    RateProduct,
                    ListAllProductsForSeller,
                    GetAllProducts,
                    ListAllProductsFromCategory


}