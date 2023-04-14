<template>
    <header class="bg-light mb-2">
      <nav class="container d-flex justify-content-between align-items-center py-3">
        <router-link :to="{ name: 'BuyerHomepage' }" class="navbar-brand" ><h3>Welcome to Shopsy, happy buying!</h3></router-link>
        <div>
          <router-link class="btn btn-primary me-2" to="/BuyerOrders">My orders</router-link>
          <a class="btn btn-secondary" @click="logout">Logout</a>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderBuyer',
    methods:{
        logout(){
            this.$store.dispatch('Logout')
        }
    }
  }
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>