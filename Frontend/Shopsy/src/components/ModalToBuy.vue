<template>
    <div v-if="isDataLoaded" class="modal-container">
        <h2>Product details</h2>
        <div class="klasa">

            <img :src="product.photo"  class="card-img-top" alt="Product image">
        </div>
        <p><b>Product name:</b> {{ product.name }}</p>
        <p><b>Product category:</b> {{ product.category }}</p>
        <p><b>Product description:</b> {{ product.description }}</p>
        <p><b>Price:</b> {{ product.price }}</p>
        <p><b>Quantity:</b> {{ product.quantity }}</p>
        <p><b>Rating:</b> {{ product.rating }} ({{ product.NoR }} total ratings)</p>
        <hr>
        <h4>Buy the product</h4>
        <div v-if="signedIn">
            <form @submit.prevent>
                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input type="number" class="form-control" id="quantity" v-model="sendInfo.quantity" min="1" :max="product.quantity" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" class="form-control" id="address" v-model="sendInfo.address" required>
                    </div>
                    <button type="submit" class="dugme btn btn-primary" @click="buyProduct">Buy</button>
            </form>
        </div>
        <div v-else>
            <h5>You have to sign in or register in<br> order to buy any products!</h5>
        </div>
        <button class="dugme btn btn-danger" @click="$emit('close')"> Close </button>
    </div>
</template>


<script>


export default {
    name: 'ModalToBuy',
    props: {
        idprod: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            isDataLoaded:false,
            sendInfo:{
                quantity:1,
                sellerId:"",
                buyerId:"",
                productId:"",
                address:""
            },
            signedIn:false
        }
    },
    computed:{
        product(){
            return this.$store.getters.ProductById
        }
    },
    created(){
        this.$store.dispatch("GetProductById", this.idprod).then(()=>{
            this.isDataLoaded = true
            let tip = $cookies.get("userType")
            if(tip =='Buyer'){
                this.signedIn = true
            }
        })
    },
    methods:{
        buyProduct(){
            console.log(this.sendInfo)
            this.sendInfo.buyerId = $cookies.get("id")
            this.sendInfo.productId = this.product.id
            this.sendInfo.sellerId = this.product.sellerId
            this.$store.dispatch("CreateOrder", this.sendInfo).then(()=>{
                this.$emit('close')
            })
        }
    }
    
}

</script>


<style scoped>
    
.dugme{
    margin-bottom:10px;
    margin-top:10px;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 20px;
  max-width: 90%;
}

.klasa{
    display: flex;
    justify-content: center;
}
.card-img-top {
    height: 200px;
    width:300px;
    object-fit: cover;
  }

</style>