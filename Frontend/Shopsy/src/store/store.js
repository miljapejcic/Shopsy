import { createStore } from 'vuex'
import Api from './apiconfig.js'
import router from '../router/index.js'
import { isProxy, toRaw } from 'vue';

const cookieTime = "1h"

const store = createStore({
    state: {
      currentUserType:null,
      currentToken:null,
      currentUserID:null,
      allProducts:[],
      allSellers:[],
      allProductsForSeller:[],
      allOrdersForSeller:[],
      productById:null,
      sellerById:null,
      allOrdersForBuyer:[],
      recProducts:[],
      recCategory:""

    },
    actions: {
      async RegisterSeller({commit}, regInfo) { 
        try {
            let res = await Api().post('/api/seller/RegisterSeller', regInfo)
            let data = res.data
            commit('setUserID', data.id)
            commit('setToken', data.token)
            commit('setUserType', data.tip)
            $cookies.set("id", data.id, cookieTime)
            $cookies.set("token", data.token, cookieTime)
            $cookies.set("userType", data.tip, cookieTime)
            
            router.push('/SellerHomepage')
        }
        catch(err) { 
          console.log(err)
            if (err.response.status == 500) { 
                console.log(err)
            }
            else { 
                console.log(err.response.data)
            }
        }
      },
      async LoginSeller({commit}, loginInfo) { 
        try { 
            let res = await Api().post('/api/seller/LoginSeller',loginInfo)
            let data = res.data
            commit('setUserID', data.id)
            commit('setToken', data.token)
            commit('setUserType', data.tip)
            $cookies.set("id", data.id, cookieTime)
            $cookies.set("token", data.token, cookieTime)
            $cookies.set("userType", data.tip, cookieTime)

            router.push('/SellerHomepage')
        }
        catch(err) { 
            if (err.response.status == 500) { 
                console.log(err)
            }
            else { 
              alert(err.response.data)
            }
        }

      },
      async RegisterBuyer({commit}, regInfo) { 
        try { 
            let res = await Api().post('/api/customer/RegisterCustomer', regInfo)
            let data = res.data
            commit('setUserID', data.id)
            commit('setToken', data.token)
            commit('setUserType', data.tip)
            $cookies.set("id", data.id, cookieTime)
            $cookies.set("token", data.token, cookieTime)
            $cookies.set("userType", data.tip, cookieTime)
            
            router.push('/BuyerHomepage')
        }
        catch(err) { 
          console.log(err)
            if (err.response.status == 500) { 
                console.log(err)
            }
            else { 
                console.log(err.response.data)
            }
        }
      },
      async LoginBuyer({commit}, loginInfo) { 
        try { 
            let res = await Api().post('/api/customer/LoginCustomer',loginInfo)
            let data = res.data
            commit('setUserID', data.id)
            commit('setToken', data.token)
            commit('setUserType', data.tip)
            $cookies.set("id", data.id, cookieTime)
            $cookies.set("token", data.token, cookieTime)
            $cookies.set("userType", data.tip, cookieTime)

            router.push('/BuyerHomepage')
        }
        catch(err) { 
            if (err.response.status == 500) { 
                console.log(err)
            }
            else { 
              alert(err.response.data)
            }
        }

      },
      async Logout({commit}) { 
        commit('setToken',null)
        commit('setUserID',null)
        commit('setUserType',null)
        $cookies.remove("id")
        $cookies.remove("token")
        $cookies.remove("userType")
        window.location.reload()
      },
      async GetAllProducts({commit}){
        try{
          let res = await Api().get('/api/product/GetAllProducts')
          commit('setAllProducts',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetAllSellers({commit}){
        try{
          let res = await Api().get('/api/seller/GetAllSellers')
          commit('setAllSellers',res.data)
        }
        catch(err) { 
          console.log(err)
        }
      },
      async UpdateSeller({commit},seller) { 
        try {
            let res = await Api().put(`api/seller/UpdateSeller/${seller.id}`,seller)
            if (res.status == 200) { 
                alert("Update successful!")
            }
            // commit('setNista')
        } catch (error) {
            console.log(error)
        }
      },
      async UpdateBuyer({commit},buyer) { 
        try {
            let res = await Api().put(`api/customer/UpdateCustomer/${buyer.id}`,buyer)
            if (res.status == 200) { 
                alert("Update successful!")
            }
            // commit('setNista')
        } catch (error) {
            console.log(error)
        }
      },
      async CreateProduct({commit}, product){
        try{
          let res = await Api().post('/api/product/CreateProduct', product)
          if (res.status == 200) { 
            alert("Product created successfully!")
          }
          return res.data
        }
        catch(err){ 
          console.log(err)
        }
      },
      async UploadPhoto({commit}, photo){
        try{
            let productId = photo.productId
            let sendPhoto = photo.photo
            let res = await Api().post(`/api/product/UploadPhoto/${productId}`,sendPhoto, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            // if (res.status == 200) { 
                
            //     window.location.reload()

            // }
        }
        catch (err) {
            console.log(err)
        }
    },
      async UpdateProduct({commit},product) { 
        try {
            let res = await Api().put(`api/product/UpdateProduct/${product.productId}`,product)
            if (res.status == 200) { 
                alert("Update successful!")
            }
        } catch (error) {
            console.log(error)
        }
      },
      async DeleteProduct({commit},id) { 
        try {
          await Api().delete(`api/product/DeleteProduct/${id}`).then((res)=>{
            if (res.data.status == 200) { 
                alert(res.data.text)
            }
            else if(res.data.status == 409){
              alert(res.data.text)
            }
          })
        } catch (error) {
            console.log(error)
        }
      },
      async RateProduct({commit}, sendInfo) { 
        try {
            let res = await Api().put(`api/product/RateProduct/${sendInfo.productId}`,sendInfo)
            if (res.status == 200) { 
                alert("Rating successful!")
            }
        } catch (error) {
            console.log(error)
        }
      },
      async GetAllProductsForSeller({commit}, sellerId){
        try{
          let res = await Api().get(`/api/product/ListAllProductsForSeller/${sellerId}`)
          commit('setAllProductsForSeller',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async CreateOrder({commit}, order){
        try{
          let res = await Api().post(`/api/order/CreateOrder`, order)
          if (res.status == 200) { 
            alert("Order successful!")
            window.location.reload()
          }
        }
        catch(err){ 
          console.log(err)
        }
      },
      async UpdateOrder({commit}, orderId){
        try{
          let res = await Api().put(`/api/order/UpdateOrder/${orderId}`)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async FinishOrder({commit}, orderId){
        try{
          let res = await Api().put(`/api/order/FinishOrder/${orderId}`)
          if (res.status == 200) { 
            window.location.reload()
          }
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetAllOrdersForSeller({commit}, sellerId){
        try{
          let res = await Api().get(`/api/order/GetAllOrdersForSeller/${sellerId}`)
          commit('setAllOrdersForSeller',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetAllProductsFromCategory({commit}, sendInfo){
        try{
          let res = await Api().post(`/api/product/ListAllProductsFromCategory`, sendInfo)
          commit('setAllProducts',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetAllSellersFromCategory({commit}, sendInfo){
        try{
          let res = await Api().post(`/api/seller/ListAllSellersFromCategory`, sendInfo)
          commit('setAllSellers',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetProductById({commit}, productId){
        try{
          let res = await Api().get(`/api/product/GetProductById/${productId}`)
          commit('setProductById',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetSellerById({commit}, sellerId){
        try{
          let res = await Api().get(`/api/seller/GetSellerById/${sellerId}`)
          commit('setSellerById',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetOrdersForBuyer({commit}, buyerId){
        try{
          let res = await Api().get(`/api/order/GetAllOrdersForCustomer/${buyerId}`)
          commit('setAllOrdersForBuyer',res.data)
        }
        catch(err){ 
          console.log(err)
        }
      },
      async GetRecommendations({commit}, buyerId){
        try{
          let res = await Api().get(`/api/order/GetRecommendations/${buyerId}`)
          commit('setRecProducts',res.data.products)
          commit('setRecCategory',res.data.category)
        }
        catch(err){ 
          console.log(err)
        }
      },
    },
    mutations: {
      setUserID(state, id){
        state.currentUserID = id
      },
      setToken(state, token){
        state.currentToken = token
      },
      setUserType(state, type){
        state.currentUserType = type
      },
      setAllProducts(state, products){
        state.allProducts = products
      },
      setAllSellers(state, sellers){
        state.allSellers = sellers
      },
      setAllProductsForSeller(state, products){
        state.allProductsForSeller = products
      },
      setAllOrdersForSeller(state, orders){
        state.allOrdersForSeller = orders
      },
      setProductById(state, product){
        state.productById = product
      },
      setSellerById(state, seller){
        state.sellerById = seller
      },
      setAllOrdersForBuyer(state, orders){
        state.allOrdersForBuyer = orders
      },
      setRecProducts(state, products){
        state.recProducts = products
      },
      setRecCategory(state, category){
        state.recCategory = category
      }
      
    },
    getters: {
      AllProducts: state =>{
        return toRaw(state.allProducts)
      },
      AllSellers: state =>{
        return toRaw(state.allSellers)
      },
      AllProductsForSeller: state => { 
        return toRaw(state.allProductsForSeller)
      },
      AllPendingOrdersForSeller: state => { 
        return toRaw(state.allOrdersForSeller.filter(o => o.status == "pending"))
      },
      AllSentOrdersForSeller: state => { 
        return toRaw(state.allOrdersForSeller.filter(o => o.status == "sent"))
      },
      ProductById: state =>{
        return toRaw(state.productById)
      },
      SellerById: state =>{
        return toRaw(state.sellerById)
      },
      AllPendingOrdersForBuyer: state => { 
        return toRaw(state.allOrdersForBuyer.filter(o => o.status == "pending"))
      },
      AllSentOrdersForBuyer: state => { 
        return toRaw(state.allOrdersForBuyer.filter(o => o.status == "sent"))
      },
      RecProducts: state => { 
        return toRaw(state.recProducts)
      },
      RecCategory: state => { 
        return toRaw(state.recCategory)
      },
    }
  })

  export default store