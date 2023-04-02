const customer = require('../models/customerModel')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


const RegisterCustomer = async (req, res) =>{
    try{
      bcrypt.hash(req.body.password, 10, async function(err, hashpass) {
          const idv4 = uuidv4().replace(/-/g, '');
          const user = {
            id: idv4,
            name: req.body.name,
            username: req.body.username,
            password: hashpass
          }
    
          await customer.RegisterCustomer(user).then( result =>{
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
  
  const LoginCustomer = async (req, res) =>{
    try{
      const {username, password} = req.body
      await customer.LoginCustomer(username, password).then( result =>{
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

const GetCustomerById = async (req, res)=>{
    try{
        await customer.GetCustomerById(req.params.id).then(result=>{
          res.status(200).send(result)
        })
      }
      catch(err){
        res.status(500).send(err.message)
      }
}

const UpdateCustomer = async (req, res)=>{
    try{
        await customer.UpdateCustomer(req.params.id, req.body).then(result=>{
          res.status(200).send(result)
        })
      }
      catch(err){
        res.status(500).send(err.message)
      }
}

// const DeleteCustomer = async (req, res)=>{
//     try{
        
//     }catch(err){
//         res.status(500).send(err.message)
//     }
// }

module.exports = {  RegisterCustomer,
                    LoginCustomer,
                    GetCustomerById,
                    UpdateCustomer,
                    // DeleteCustomer
                }