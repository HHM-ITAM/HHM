<template>
  <div class="login">
    <div class="w3-card login-form">  
      <header class="w3-container w3-blue">
        <h1>Login</h1>
      </header>
      <div class="w3-container">
        <form @submit.prevent="addUser">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <label for="pass">Password</label>
          <input type="password" name="pass" id="pass" v-model="user.pass">
          <button type="submit">  Login</button>
          <a @click.prevent="goToRegister">Aún sin cuenta, crea una.</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        pass: ''
      } 
    }
  },
  methods: {
    addUser () {
      let vm = this;
      firebase.auth().signInWithEmailAndPassword(vm.user.email, vm.user.pass)
      .then((user) => vm.$router.push({name: 'Home'}))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    },
    goToRegister () {
      this.$router.push({name: 'Register'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-form{
  align-self: center;
  width: 250px;
}

input{
  display: box;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}
button{
  display: box;
  margin-bottom: 5px;
}

a{
  width: 100%;
  display: block;
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
}
a:hover{
  color: blue;
}
</style>
