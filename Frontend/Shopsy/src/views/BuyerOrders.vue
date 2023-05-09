<template>
    <div>
        <HeaderBuyer/>
        <h1>Orders that have been sent by seller</h1>
        <div v-if="sentOrders.length >0">
            <OrderCardBuyer v-for="order in sentOrders" :key="order.orderId" :order="order"/>
        </div>
        <div v-else>
            <h3>You don't have any sent orders.</h3>
        </div>
        <h1>Pending orders</h1>
        <div v-if="pendingOrders.length > 0">
            <OrderCardBuyer v-for="order in pendingOrders" :key="order.orderId" :order="order"/>
        </div>
        <div v-else>
            <h3>You don't have any pending orders.</h3>
        </div>
        <div v-if="recProducts.length > 0">
            <h1>Because you liked: {{ recCategory }}</h1>
            <div class="container">
                    <div class="row d-flex justify-content-center">
            <ProductCardBuyer v-for="product in recProducts" :key="product.id" :product="product"/>
                    </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import HeaderBuyer from '../components/HeaderBuyer.vue'
import Footer from '../components/Footer.vue'
import OrderCardBuyer from '../components/OrderCardBuyer.vue';
import ProductCardBuyer from '../components/ProductCardBuyer.vue';


export default {
    title:'BuyerOrders',
    components:{
        HeaderBuyer,
        Footer,
        OrderCardBuyer,
        ProductCardBuyer
    },
    computed:{
        pendingOrders(){
            return this.$store.getters.AllPendingOrdersForBuyer
        },
        sentOrders(){
            return this.$store.getters.AllSentOrdersForBuyer
        },
        recProducts(){
            return this.$store.getters.RecProducts
        },
        recCategory(){
            return this.$store.getters.RecCategory
        }
    },
    created(){
        this.$store.dispatch("GetOrdersForBuyer", $cookies.get("id"))
        this.$store.dispatch("GetRecommendations", $cookies.get("id"))
    }
}
</script>
<style lang="">
    
</style>