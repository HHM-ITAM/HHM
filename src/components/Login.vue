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
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
  },
  mounted () {
    console.log('ok');
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
