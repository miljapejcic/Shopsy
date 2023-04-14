<template>
    <div>
        <HeaderBuyer/>
        <div v-if="!isDataLoaded">
            Loading...
        </div>
        <div v-else>
            <h2> {{ seller.store }}</h2>
            <p> <b>Username: </b> {{ seller.username }}</p>
            <p> <b>Owner: </b> {{ seller.owner }}</p>
            <p><b>Rating:</b> {{ seller.rating }} ({{ seller.NoR }} total ratings)</p>
            <h3>Their products:</h3>
            <div>
            <div v-if="seller.products.length > 0">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <ProductCardBuyer v-for="product in seller.products" :key="product.id" :product="product"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>No products found.</h3>
            </div>
        </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import HeaderBuyer from '../components/HeaderBuyer.vue'
import Footer from '../components/Footer.vue'
import ProductCardBuyer from '../components/ProductCardBuyer.vue'


export default {
    title:'SellerPage',
    components:{
        HeaderBuyer,
        Footer,
        ProductCardBuyer
    },
    data(){
        return {
            isDataLoaded:false
        }
    },
    computed:{
        seller(){
            return this.$store.getters.SellerById
        }
    },
    created(){
        this.$store.dispatch("GetSellerById", this.$route.params.id).then(()=>{
            this.isDataLoaded = true
        })
    }
}
</script>
<style>
    
</style>