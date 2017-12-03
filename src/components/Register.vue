<template>
  <div class="login">
    <div class="w3-card login-form">  
      <header class="w3-container w3-blue">
        <h1>Registro</h1>
      </header>
      <div class="w3-container">
        <form @submit.prevent="addUser">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <label for="pass">Password</label>
          <input type="password" name="pass" id="pass" v-model="user.pass">
          <button type="submit">Registrarse</button>
          <a @click.prevent="goToLogin">Ya tengo una cuenta.</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
      vm.app.auth().createUserWithEmailAndPassword(vm.user.email, vm.user.pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    },
    goToLogin () {
      this.$router.push({name : 'Login'});
    }
  },
  props: [
    'app'
  ],
  mounted () {
    let vm = this;
    vm.app.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('Sign In');
        vm.app.auth().signOut()
          .then(function() {
            console.log('Sign Out');
          })
          .catch(error => console.log('error = ' + error.message));
      } else {
        // User is signed out.
        // ...
      }
    });
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
  width: 100%;
  display: block;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
}
a:hover{
  color: blue;
}
</style>
