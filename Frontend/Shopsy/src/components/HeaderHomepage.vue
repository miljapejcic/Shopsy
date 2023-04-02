<template>
    <header class="bg-light">
      <nav class="container d-flex justify-content-between align-items-center py-3">
        <router-link class="navbar-brand" to="/">Welcome to Shopsy!</router-link>
        <div>
          <router-link class="btn btn-primary me-2" to="/BuyerLogin">Buyer</router-link>
          <router-link class="btn btn-secondary" to="/SellerLogin">Seller</router-link>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>