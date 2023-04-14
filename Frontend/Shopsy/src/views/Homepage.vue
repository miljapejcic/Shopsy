<template lang="">
    <HeaderHomepage/>
    <h1>Take a look at the selection of products available on the website</h1>
    <div>
        <div class="container">
            <div class="row d-flex justify-content-center">
                <ProductCardBuyer v-for="product in allProducts" :key="product.id" :product="product"/>
            </div>
        </div>
    </div>
    <h1>Take a look at the selection of sellers available on the website</h1>
    <div>
        <div class="container">
            <div class="row d-flex justify-content-center">
                <SellerCardBuyer v-for="seller in allSellers" :key="seller.id" :seller="seller"/>
            </div>
        </div>
    </div>
    <Footer/>
</template>


<script>
import HeaderHomepage from '@/components/HeaderHomepage.vue';
import Footer from '@/components/Footer.vue'
import ProductCardBuyer from '../components/ProductCardBuyer.vue';
import SellerCardBuyer from '../components/SellerCardBuyer.vue';

export default {
    components:{
    HeaderHomepage,
    Footer,
    ProductCardBuyer,
    SellerCardBuyer
    },
    computed:{
        allProducts(){
            return this.$store.getters.AllProducts   //da uvedem limit od dvadesetak proizvoda
        },
        allSellers(){
            return this.$store.getters.AllSellers   //da uvedem limit od dvadesetak prodavaca
        }
    },
    created(){
        this.$store.dispatch("GetAllProducts")
        this.$store.dispatch("GetAllSellers")
    },

    
}
</script>


<style>
    
</style>