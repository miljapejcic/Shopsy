<template>
    <div>
        <HeaderSeller/>
        <h1>Orders you haven't sent</h1>
        <OrderCard
              v-for="o in pendingOrders"
              :key="o.id"
              :order="o"
        />
        <h1>Previously sent orders</h1>
        <OrderCard
              v-for="o in sentOrders"
              :key="o.id"
              :order="o"
        />
        <Footer/>
    </div>
</template>

<script>

import HeaderSeller from '../components/HeaderSeller.vue'
import Footer from '../components/Footer.vue'
import OrderCard from '../components/OrderCard.vue'


export default {
    title:'SellerOrders',
    components:{
        HeaderSeller,
        Footer,
        OrderCard
    },
    computed:{
        pendingOrders(){
            return this.$store.getters.AllPendingOrdersForSeller
        },
        sentOrders(){
            return this.$store.getters.AllSentOrdersForSeller
        },
    },
    created(){
        this.$store.dispatch("GetAllOrdersForSeller", this.$cookies.get("id"))
    },
}
</script>
<style lang="">
    
</style>


