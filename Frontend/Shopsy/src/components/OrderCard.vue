<template>
  <div class="container mb-4 box-shadow card">
    <div class="row">
      <div class="col">
        <div class="card-body">
                <h5 class="card-title">Order ID number: {{ order.orderId }}</h5>
                <p class="card-text">Product name: {{ order.product.name }}</p>
                <p class="card-text">Product category: {{ order.product.category }}</p>
                <p class="card-text">Quantity: {{ order.quantity }}</p>
                <p class="card-text">Adress: {{ order.address }}</p>
                <p class="card-text">Total price: {{ order.price }}</p>
                <p class="card-text">Status: {{ order.status }}</p>
                <div v-if="order.status =='pending'">
                    <button type="submit" class="btn btn-primary" @click="sendOrder">Send Order</button>
                </div>
            </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <img :src="order.product.photo" class="card-img-top" alt="">
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
            this.$store.dispatch("UpdateOrder", this.order.orderId).then(()=>{
                this.$store.dispatch("GetAllOrdersForSeller", this.$cookies.get("id"))
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
    width:300px;
    object-fit: cover;
  }
  
  .card-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  </style>