<template>
  <div class="container mb-4 box-shadow card">
    <div class="row">
      <div class="col">
        <div class="card-body">
                <h5 class="card-title">Order ID number: {{ order.orderId }}</h5>
                <p class="card-text">Product name: {{ order.product.name }}</p>
                <p class="card-text">Product category: {{ order.product.category }}</p>
                <p class="card-text">Quantity: {{ order.quantity }}</p>
                <p class="card-text">Total price: {{ order.price }}</p>
                <p class="card-text">Status: {{ order.status }}</p>
                <div v-if="order.status=='sent'">
                    <button class="btn btn-success" @click="show">Order received?</button>
                    <teleport to="body">
                      <div class="modal" v-if="showModal">
                          <ModalToRate :orderid="order.orderId" :product="order.product" @close="showModal = false" />
                      </div>
                    </teleport>
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

import ModalToRate from './ModalToRate.vue'

  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    components:{
      ModalToRate
    },
    data(){
        return {
            showModal:false
        }
    },
    methods:{
        show(){
            this.showModal = true
        }
    }
  }
  </script>
  
  <style scoped>

.root{
    position:relative
  }
.modal{
    position:absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.1);
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .modal > div {
    background-color: #fff;
    padding:50px;
    border-radius: 10px;
  }
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