<template>
    <div class="col-xl-3 mb-3">
      <div v-if="signedIn">
        <router-link class="card root text-decoration-none text-dark" :to="{ name: 'SellerPage', params: { id: seller.id } }">
          <img src='../../src/assets/store.jpg' class="card-img-top" alt="Product image">
          <div class="card-body">
            <h5 class="card-title">{{ seller.store }}</h5>
            <p class="card-text"><b>Username: </b>{{ seller.username }}</p>
            <p class="card-text"><b>Owner: </b>{{ seller.owner }}</p>
          </div>
        </router-link>
      </div>
      <div v-else>
        <div class="card root">
          <img src='../../src/assets/store.jpg' class="card-img-top" alt="Product image">
          <div class="card-body">
            <h5 class="card-title">{{ seller.store }}</h5>
            <p class="card-text"><b>Username: </b>{{ seller.username }}</p>
            <p class="card-text"><b>Owner: </b>{{ seller.owner }}</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>

export default {
    name: 'SellerCardBuyer',
    props: {
    seller: {
        type: Object,
        required: true
    }},
    data(){
        return {
            slika:'../../src/assets/slika.jpg',
            signedIn:false
        }
    },
    created(){
      let tip = $cookies.get("userType")
      if(tip =='Buyer'){
          this.signedIn = true
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
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>