const seller = require('../models/sellerModel')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


const RegisterSeller = async (req, res) =>{
  try{
    bcrypt.hash(req.body.password, 10, async function(err, hashpass) {
        const idv4 = uuidv4().replace(/-/g, '');
        const user = {
          id: idv4,
          username: req.body.username,
          password: hashpass,
          store: req.body.store,
          owner: req.body.owner,
          rating:0,
          NoR:0
        }
  
        await seller.RegisterSeller(user).then( result =>{
          if(result.status == 200){
            res.status(200).send(result)
          }
          else if(result.status == 401){
            res.status(401).send("Korisnik sa tim username-om vec postoji!")
          }
        }).catch(err => res.status(500).send(err.message))
      });     
  }
  catch(err){
      res.status(500).send(err.message)
  }
}

const LoginSeller = async (req, res) =>{
  try{
    const {username, password} = req.body
    await seller.LoginSeller(username, password).then( result =>{
      if(result.status==200){
        res.status(200).send(result.sendInfo)
      }
      else if(result.status == 401){
        res.status(401).send('Pogresna sifra!')
      }
      else if(result.status == 404){
        res.status(404).send('Korisnik sa tim username-om ne postoji!')
      }
    }).catch(err => {
      res.status(500).send(err.message)})
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

const GetSellerById = async (req, res) =>{
    try{
      await seller.GetSellerById(req.params.id).then(result=>{
        res.status(200).send(result)
      })
    }
    catch(err){
      res.status(500).send(err.message)
    }
}

const GetAllSellers = async (req, res)=>{
  try{
    await seller.GetAllSellers().then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

const UpdateSeller = async (req, res) =>{
  try{
    await seller.UpdateSeller(req.params.id, req.body).then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

const RateSeller = async (req, res) =>{
  try{
    await seller.RateSeller(req.params.id, req.body).then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send(err.message)
  }
}

const ListAllSellersFromCategory = async (req, res)=>{
  try{
    await seller.ListAllSellersFromCategory(req.body.category).then(result=>{
      res.status(200).send(result)
    })
  }
  catch(err){
    res.status(500).send(err.message)
  }
}


module.exports = {  RegisterSeller,
                    LoginSeller, 
                    GetSellerById, 
                    GetAllSellers, 
                    UpdateSeller,
                    RateSeller,
                    ListAllSellersFromCategory }