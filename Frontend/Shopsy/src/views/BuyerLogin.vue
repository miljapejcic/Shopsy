<template>
    <HeaderHomepage/>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Login</h2>
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" class="form-control" id="username" placeholder="Enter username...">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password...">
            </div>
            <button type="submit" class="btn btn-primary mt-2">Login</button>
          </form>
        </div> 
        <div class="col-md-6">
          <h2>Register</h2>
          <form>
            <div class="form-group">
              <label for="name">Name and surname</label>
              <input type="text" class="form-control" id="name" placeholder="Enter name and surname...">
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" class="form-control" id="username" placeholder="Enter username...">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password...">
            </div>
            <button type="submit" class="btn btn-primary mt-2">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderHomepage from '@/components/HeaderHomepage.vue';

  export default {
    name: 'LoginPage',
    components:{
    HeaderHomepage
    }
  }
  </script>
  
  <style>
  /* Add custom styles here */
  </style>