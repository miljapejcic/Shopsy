<template>
    <div>
        <HeaderSeller/>
        <h1>Create a new product</h1>
        <div>
            <form @submit.prevent>
                <div class="form-group stilzaformu">
                    <label for="name">Product Name:</label>
                    <input type="text" class="form-control" id="name" v-model="product.name" required>
                </div>
                <div class="form-group stilzaformu">
                    <label for="category">Category:</label>
                    <input type="text" class="form-control" id="category" v-model="product.category" required>
                </div>
                <div class="form-group stilzaformu">
                    <label for="description">Description:</label>
                    <textarea class="form-control" id="description" v-model="product.description" required></textarea>
                </div>
                <div class="form-group stilzaformu">
                    <label for="price">Price:</label>
                    <input type="number" class="form-control" id="price" v-model="product.price" min="0" step="5" required>
                </div>
                <div class="form-group stilzaformu">
                    <label for="quantity">Quantity:</label>
                    <input type="number" class="form-control" id="quantity" v-model="product.quantity" min="0" step="1" required>
                </div>
                <div class="form-group stilzaformu">
                    <label for="photo">Photo:</label>
                    <input style="padding-left:10px" type="file" class="form-control-file" id="photo" @change="processFile">
                </div>
                <button type="submit" class="btn btn-primary" @click="createProduct">Create Product</button>
            </form>
        </div>
        <h1>Your products</h1>
        <div>
            <ProductCardSeller
              v-for="p in products"
              :key="p.id"
              :productProp="p"
            />
        </div>  
        <Footer/>
    </div>
</template>

<script>

import HeaderSeller from '../components/HeaderSeller.vue'
import Footer from '../components/Footer.vue'
import ProductCardSeller from '../components/ProductCardSeller.vue'


export default {
    title:'SellerHomepage',
    components:{
        HeaderSeller,
        Footer,
        ProductCardSeller
    },
    data(){
        return {
            product:{
                sellerId:"",
                category:"",
                name:"",
                price:"",
                quantity:0,
                description:"",
                photo:null
            },
            photo:null
        }
    },
    computed:{
        products(){
            return this.$store.getters.AllProductsForSeller
        }
    },
    created(){
        this.$store.dispatch("GetAllProductsForSeller", this.$cookies.get("id"))
    },
    methods:{
        processFile(event){
            this.photo = event.target.files[0];
        },
        createProduct(){

            this.product.sellerId = $cookies.get("id")
            var form = new FormData()
            form.append('image', this.photo);



            this.$store.dispatch("CreateProduct", this.product).then((result)=>{
                this.$store.dispatch("UploadPhoto", {
                    productId:result.id,
                    photo:form
                }).then(()=>{
                    window.location.reload()
                    // this.$store.dispatch("GetAllProductsForSeller", this.$cookies.get("id"))
                    // this.product = {
                    //     sellerId:"",
                    //     category:"",
                    //     name:"",
                    //     price:"",
                    //     quantity:0,
                    //     description:"",
                    //     photo:null
                    // };
                    // this.photo=null
                })
                })
        }
    }
}
</script>


<style scoped>
   .stilzaformu{
        padding-bottom: 10px;
    }
</style>