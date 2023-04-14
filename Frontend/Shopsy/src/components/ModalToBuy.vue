<template>
    <div v-if="isDataLoaded">
        <h2>Product details</h2>
        <img src='../../src/assets/slika.jpg' class="" style="width:300px" alt="Product image">
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
                productId:""
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
        console.log(this.idprod)
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

</style>