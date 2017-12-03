<template>
  <div class="login">
      <form @submit.prevent="addUser">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" v-model="user.email">
        <label for="pass">Password</label>
        <input type="password" name="pass" id="pass" v-model="user.pass">
        <button type="submit">
          Login
        </button>
      </form>
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

form{
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
}
</style>
