import { createStore } from 'vuex'
import Api from './apiconfig.js'
import router from '../router/index.js'

const cookieTime = "1h"

const store = createStore({
    state: {
      currentUserType:null,
      currentToken:null,
      currentUserID:null,

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
      }
    },
    getters: {
      // Define your getters here
    }
  })

  export default store