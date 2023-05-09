<template>
    <div>
        <HeaderBuyer/>
        <h1 class="text-center">Search for categories of anything you need!</h1>
        <div class="input-group mb-3 mt-3">
            <input type="text" class="form-control rounded stilzasearch" v-model="searchQuery" placeholder="Search for categories..." @keyup.enter="filterProducts"> 
            <!-- // aria-label="Default" aria-describedby="inputGroup-sizing-default" -->
            <div v-if="notSearchedYet" class="input-group-prepend">
                <button @click="filterProducts" class="btn btn-primary">Search</button>
            </div>
            <div v-else>
                <button @click="cancelSearch" class="btn btn-danger">Cancel</button>
            </div>
        </div>
        <h2>Products</h2>
        <div>
            <div v-if="allProducts.length > 0">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <ProductCardBuyer v-for="product in allProducts" :key="product.id" :product="product"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>No products found.</h3>
            </div>
        </div>
        <h2>Sellers:</h2>
        <div>
            <div v-if="allSellers.length > 0">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <SellerCardBuyer v-for="seller in allSellers" :key="seller.id" :seller="seller"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>No sellers found.</h3>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import HeaderBuyer from '../components/HeaderBuyer.vue'
import Footer from '../components/Footer.vue'
import ProductCardBuyer from '../components/ProductCardBuyer.vue'
import SellerCardBuyer from '../components/SellerCardBuyer.vue'


export default {
    title:'BuyerHomepage',
    components:{
        HeaderBuyer,
        Footer,
        ProductCardBuyer,
        SellerCardBuyer
    },
    data(){
        return {
            searchQuery:"",
            notSearchedYet:true
        }
    },
    computed:{
        allProducts(){
            return this.$store.getters.AllProducts
        },
        allSellers(){
            return this.$store.getters.AllSellers
        }
    },
    created(){
        this.$store.dispatch("GetAllProducts")
        this.$store.dispatch("GetAllSellers")
    },
    methods:{
        filterProducts() { 
            this.notSearchedYet = false
            if(this.searchQuery==""){
                this.$store.dispatch("GetAllProducts")
                this.$store.dispatch("GetAllSellers")
            }
            else{
                let categorySearch = this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1).toLowerCase()
                let sendInfo={
                    category:categorySearch
                }
                this.$store.dispatch("GetAllProductsFromCategory", sendInfo)
                this.$store.dispatch("GetAllSellersFromCategory", sendInfo)
            }
        },
        cancelSearch(){
            this.notSearchedYet = true
            this.$store.dispatch("GetAllProducts")
            this.$store.dispatch("GetAllSellers")
            this.searchQuery = ""
        }
    },
}

</script>

<style scoped>

.stilzasearch{
    margin-right:10px;
}
    
</style>