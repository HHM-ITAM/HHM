<template>
  <div class="login">
    <div class="w3-card login-form">  
      <header class="w3-container w3-blue header">
        <h1>Login</h1>
      </header>
      <div class="w3-container form">
        <form @submit.prevent="signIn">
          <p v-if="error" class="error">{{error}}</p>
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <label for="pass">Password</label>
          <input type="password" name="pass" id="pass" v-model="user.pass">
          <button type="submit" class="w3-btn w3-blue w3-block">Login</button>
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
      },
      error: ''
    }
  },
  methods: {
    signIn () {
      let vm = this;
      firebase.auth().signInWithEmailAndPassword(vm.user.email, vm.user.pass)
      .then((user) => vm.$router.push({name: 'Home'}))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        vm.error = errorMessage;
        vm.user.pass = '';
      });
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
  background-color: lightgrey;
}

.login-form{
  align-self: center;
  width: 250px;
  background-color: white;
  width: 500px;
  height: 500px;
}

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

label{
  font-size: 30px;
}
input{
  height: 50px;
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}
button{
  display: block;
  margin-bottom: 5px;
}
a{
  display: block;
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
a:hover{
  color: blue;
}

.error{
  color: red;
  text-decoration: underline;
}

@media only screen and (max-width: 750px) {
  .login-form{
    width: 90%;
    height: 90%;
  }
  .header{
    height: 15%;
  }
  .form{
    height: 85%;
  }
  form{
    height: 100%;
  }
  label{
    font-size: 20px;
  }
  input{
    height: 50px;
  }
  
}
</style>
