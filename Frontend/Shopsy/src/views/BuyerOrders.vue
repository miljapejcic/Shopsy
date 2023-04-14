<template>
    <div>
        <HeaderBuyer/>
        <h1>Pending orders</h1>
        <OrderCardBuyer v-for="order in pendingOrders" :key="order.id" :order="order"/>
        <h1>Orders that have been sent by seller</h1>
        <OrderCardBuyer v-for="order in sentOrders" :key="order.id" :order="order"/>
        <h1>Because you liked:</h1>
        <p>lista predlozenih proizvoda</p>
        <Footer/>
    </div>
</template>

<script>

import HeaderBuyer from '../components/HeaderBuyer.vue'
import Footer from '../components/Footer.vue'
import OrderCardBuyer from '../components/OrderCardBuyer.vue';


export default {
    title:'BuyerOrders',
    components:{
        HeaderBuyer,
        Footer,
        OrderCardBuyer
    },
    computed:{
        pendingOrders(){
            return this.$store.getters.AllPendingOrdersForBuyer
        },
        sentOrders(){
            return this.$store.getters.AllSentOrdersForBuyer
        }
    },
    created(){
        this.$store.dispatch("GetOrdersForBuyer", $cookies.get("id"))
    }
}
</script>
<style lang="">
    
</style>