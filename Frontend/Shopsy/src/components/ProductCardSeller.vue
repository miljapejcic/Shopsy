<template>
  <div class="container mb-4 box-shadow card">
    <div class="row">
      <div class="col">
        <div v-if="!ToUpdate" class="card-body">
            <h5 class="card-title">{{ productProp.name }}</h5>
            <p class="card-text">Category: {{ productProp.category }}</p>
            <p class="card-text">Description: {{ productProp.description }}</p>
            <p class="card-text">Price: {{ productProp.price }}</p>
            <p class="card-text">Quantity: {{ productProp.quantity }}</p>
            <p class="card-text">Rating: {{ productProp.rating }}</p>
            <button class="btn btn-primary" @click="toggleUpdate">Update the product</button>
          </div>
          <div v-else class="card-body" >
            <form @submit.prevent>
                <div class="form-group">
                    <label for="name">Product Name:</label>
                    <input type="text" class="form-control" id="name" v-model="updateInfo.name" >
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea class="form-control" id="description" v-model="updateInfo.description"></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" class="form-control" id="price" v-model="updateInfo.price" min="0">
                </div>
                <div class="form-group">
                    <label for="quantity">Quantity:</label>
                    <input type="number" class="form-control" id="quantity" v-model="updateInfo.quantity" min="0" step="1">
                </div>
                <button type="submit" class="btn btn-success stilzadugme" @click="updateProduct">Finish update</button>
                <button class="btn btn-danger stilzadugme" @click="toggleUpdate">Cancel update</button>
            </form>
          </div>
      </div>
      <div class="col d-flex align-items-center flex-column justify-content-center">
        <img :src="productProp.photo" class="card-img-top" alt="">
        <button class="btn btn-danger stilzadugme" @click="deleteProduct">Delete product</button>
      </div>
    </div>
  </div>

</template>
  
  <script>
  export default {
    title:"ProductCardSeller",
    props: {
      productProp:{ 
        required: true,
        type: Object
        }
    },
    data(){
      return {
        ToUpdate:false,
        updateInfo:{
          name:"",
          description:"",
          quantity:0,
          price:0
        }
      }
    },
    created(){
        this.updateInfo.name=this.productProp.name,
        this.updateInfo.description=this.productProp.description,
        this.updateInfo.quantity=this.productProp.quantity,
        this.updateInfo.price=this.productProp.price
    },
    methods:
    {
        updateProduct(){
            let sendUpdate={
              productId:this.productProp.id,
              name: this.updateInfo.name,
              description: this.updateInfo.description,
              quantity: this.updateInfo.quantity,
              price:this.updateInfo.price
            }
            this.$store.dispatch("UpdateProduct", sendUpdate).then(()=>{
              this.$store.dispatch("GetAllProductsForSeller", this.$cookies.get("id"))
              this.toggleUpdate()
            })
        },
        toggleUpdate(){
          if(this.ToUpdate == false){
            this.updateInfo.name=this.productProp.name,
            this.updateInfo.description=this.productProp.description,
            this.updateInfo.quantity=this.productProp.quantity,
            this.updateInfo.price=this.productProp.price
          }
          this.ToUpdate = !this.ToUpdate
        },
        deleteProduct(){
          this.$store.dispatch("DeleteProduct", this.productProp.id).then(()=>{
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

  .stilzadugme{
    margin-top:10px;
    margin-right: 10px;
  }
  
  .card-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .card-img-top {
    height: 200px;
    width:300px;
    object-fit: cover;
  }
  </style>