import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import BuyerLogin from '@/views/BuyerLogin.vue'
import SellerLogin from '@/views/SellerLogin.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/BuyerLogin',
      name: 'BuyerLogin',
      component: BuyerLogin
    },
    {
      path: '/SellerLogin',
      name: 'SellerLogin',
      component: SellerLogin
    },
    // {
    //   path: '/HomepageCustomer',
    //   name: 'HomepageCustomer',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/HomepageCustomer.vue')
    // },
    // {
    //   path: '/ProfileSeller',
    //   name: 'ProfileSeller',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/ProfileSeller.vue')
    // },
    // {
    //   path: '/ProfileCustomer',
    //   name: 'ProfileCustomer',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/ProfileCustomer.vue')
    // },
  ]
})

export default router
