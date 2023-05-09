<template>
    <div class="col-xl-3 mb-3">
      <div class="card root">
        <img :src="product.photo" class="card-img-top" alt="Product image">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.category }}</p>
          <p class="card-text">Rating: {{ product.rating }}</p>
          <button class="btn btn-primary" @click="show">View more</button>
          <teleport to="body">
            <div class="modal" v-if="showModal">
                <ModalToBuy :idprod="product.id" @close="showModal = false" />
            </div>
          </teleport>
        </div>
      </div>
    </div>
</template>
  
<script>

import ModalToBuy from './ModalToBuy.vue';

export default {
    name: 'ProductCardBuyer',
    props: {
    product: {
        type: Object,
        required: true
    }},
    components:{
        ModalToBuy
    },
    data(){
        return {
            showModal:false,
            slika:'../../src/assets/slika.jpg'
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
    /* background-color: rgba(0,0,0,0.1); */
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
  }
  
  .card-img-top {
    height: 200px;
    width:300px;
    object-fit: cover;
  }
  </style>