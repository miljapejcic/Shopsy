<template>
    <div >
        <h2>Product details</h2>
        <div class="klasa">

            <img :src="product.photo" class="card-img-top" alt="Product image">
        </div>
        <p><b>Product name:</b> {{ product.name }}</p>
        <p><b>Product category:</b> {{ product.category }}</p>
        <p><b>Product description:</b> {{ product.description }}</p>
        <p><b>Price:</b> {{ product.price }}</p>
        <p><b>Rating:</b> {{ product.rating }} ({{ product.NoR }} total ratings)</p>
        <hr>
        <h4>Rate the product</h4>
        <star-rating @update:rating ="setRating"></star-rating>
            <button type="submit" class="dugme btn btn-primary" @click="rateProduct">Rate and finish order</button>
        <button class="dugme btn btn-danger" @click="$emit('close')"> Close </button>
    </div>
</template>
<script>

import StarRating from 'vue-star-rating'

export default {
    name: 'ModalToRate',
    props: {
        orderid: {
            type: String,
            required: true
        },
        product:{
            type: Object,
            required: true
        }
    },
    components: {
        StarRating
    },
    data(){
        return {
            isDataLoaded:false,
            sendInfo:{
                productId:"",
                rating:0
            }
        }
    },
    methods:{
        rateProduct(){
            this.sendInfo.productId = this.product.id
            this.$store.dispatch("RateProduct", this.sendInfo).then(()=>{
                this.$store.dispatch("FinishOrder", this.orderid).then(()=>{
                this.$emit('close')
            })
            })
        },
        setRating(rating){
            this.sendInfo.rating= rating;
        }
    }
    
}
</script>
<style scoped>
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