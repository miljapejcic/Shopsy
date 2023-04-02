import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import BuyerLogin from '@/views/BuyerLogin.vue'
import SellerLogin from '@/views/SellerLogin.vue'
import SellerHomepage from '@/views/SellerHomepage.vue'
import SellerProfile from '@/views/SellerProfile.vue'
import BuyerProfile from '@/views/BuyerProfile.vue'
import BuyerHomepage from '@/views/BuyerHomepage.vue'

function checkType() { 
  let userType = $cookies.get('userType')
  return userType
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      beforeEnter(to,from,next) { 
        if (checkType() == null) { 
            next()
        }
        else if(checkType() == "Seller") { 
            next({name: 'SellerHomepage'})
        }
        else if(checkType() == "Buyer") { 
            next({name: 'BuyerHomepage'})
      }
      }
    },
    {
      path: '/BuyerLogin',
      name: 'BuyerLogin',
      component: BuyerLogin,
      beforeEnter(to,from,next) { 
        if (checkType() == null) { 
            next()
        }
        else if(checkType() == "Seller") { 
            next({name: 'SellerHomepage'})
        }
        else if(checkType() == "Buyer") { 
            next({name: 'BuyerHomepage'})
        }
      }
    },
    {
      path: '/SellerLogin',
      name: 'SellerLogin',
      component: SellerLogin,
      beforeEnter(to,from,next) { 
        if (checkType() == null) { 
            next()
        }
        else if(checkType() == "Seller") { 
            next({name: 'SellerHomepage'})
        }
        else if(checkType() == "Buyer") { 
            next({name: 'BuyerHomepage'})
        }
      }
    },
    {
      path: '/SellerHomepage',
      name: 'SellerHomepage',
      component: SellerHomepage,
      beforeEnter(to,from,next) { 
        if (checkType()=="Seller") { 
            next()
        }
        else if (checkType()=="Buyer") { 
          next({name: 'BuyerHomepage'})
        }
        else { 
            next({name: 'Homepage'})
        }
      }
    },
    {
      path: '/SellerProfile',
      name: 'SellerProfile',
      component: SellerProfile,
      beforeEnter(to,from,next) { 
        if (checkType()=="Seller") { 
            next()
        }
        else if (checkType()=="Buyer") { 
          next({name: 'BuyerHomepage'})
        }
        else { 
            next({name: 'Homepage'})
        }
      }
    },
    {
      path: '/BuyerProfile',
      name: 'BuyerProfile',
      component: BuyerProfile,
      beforeEnter(to,from,next) { 
        if (checkType()=="Buyer") { 
            next()
        }
        else if (checkType()=="Seller") { 
          next({name: 'SellerHomepage'})
        }
        else { 
            next({name: 'Homepage'})
        }
      }
    },
    {
      path: '/BuyerHomepage',
      name: 'BuyerHomepage',
      component: BuyerHomepage,
      beforeEnter(to,from,next) { 
        if (checkType()=="Buyer") { 
            next()
        }
        else if (checkType()=="Seller") { 
          next({name: 'SellerHomepage'})
        }
        else { 
            next({name: 'Homepage'})
        }
      }
    },
  ]
})

export default router
