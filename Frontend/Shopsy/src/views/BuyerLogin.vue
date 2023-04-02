<template>
  <div>
    <HeaderHomepage/>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Login</h2>
          <form @submit.prevent>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" class="form-control" id="loginusername" v-model="loginInfo.username" placeholder="Enter username...">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="loginpassword" v-model="loginInfo.password" placeholder="Enter password...">
            </div>
            <button v-on:click="login" class="btn btn-primary mt-2">Login</button>
          </form>
        </div> 
        <div class="col-md-6">
          <h2>Register</h2>
          <form @submit.prevent>
            <div class="form-group">
              <label for="name">Name and surname</label>
              <input type="text" class="form-control" id="regname" v-model="regInfo.name" placeholder="Enter name and surname...">
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" class="form-control" id="regusername" v-model="regInfo.username" placeholder="Enter username...">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="regpassword" v-model="regInfo.password" placeholder="Enter password...">
            </div>
            <button v-on:click="register" class="btn btn-primary mt-2">Register</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
  
<script>
import HeaderHomepage from '@/components/HeaderHomepage.vue';
import Footer from '@/components/Footer.vue'


export default {
  title: 'BuyerLogin',
  components:{
  HeaderHomepage,
  Footer
  },
  data(){
        return {
            loginInfo:{
                username:"",
                password:""
            },
            regInfo:{
                name:"",
                username:"",
                password:""
            }
        }
    },
    methods:{
        login(){
            if(this.loginInfo.username !== "" && this.loginInfo.password !==""){
                this.$store.dispatch("LoginBuyer", this.loginInfo)
            }
            else{
                alert("All fields must be filled!")
            }
        },
        register(){
            if(this.regInfo.name !== "" && this.regInfo.username !== "" && this.regInfo.password !==""){
                this.$store.dispatch("RegisterBuyer", this.regInfo)
            }
            else{
                alert("All fields must be filled!")
            }
        }
    }
}
</script>

<style>
/* Add custom styles here */
</style>