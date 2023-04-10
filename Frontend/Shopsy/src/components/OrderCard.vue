<template>
    <div class="row">
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <h5 class="card-title">Order ID number: {{ order.id }}</h5>
                <p class="card-text">Product name: {{ order.productName }}</p>
                <p class="card-text">Product category: {{ order.productCategory }}</p>
                <p class="card-text">Quantity: {{ order.quantity }}</p>
                <p class="card-text">Total price: {{ order.price }}</p>
                <p class="card-text">Status: {{ order.status }}</p>
                <div v-if="order.status =='pending'">
                    <button type="submit" class="btn btn-primary" @click="sendOrder">Send Order</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    methods:{
        sendOrder(){
            this.$store.dispatch("UpdateOrder", this.order.id).then(()=>{
                this.$store.dispatch("GetAllProductsForSeller", this.$cookies.get("id"))
            })
        }
    }
  }
  </script>
  
  <style scoped>
  .card {
    height: 100%;
    width: 100%;
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  </style>