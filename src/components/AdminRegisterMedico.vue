<template>
  <div class="admin-register">
    <div class="w3-card register-form">
      <button class="w3-btn w3-red regresar" @click.prevent="goBack">Regresar</button>  
      <header class="w3-container w3-blue header">
        <h1>Registro</h1>
      </header>
      <div class="w3-container form">
        <form @submit.prevent="addUser">
          <p v-if="error" class="error">{{error}}</p>
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <label for="pass">Password</label>
          <input type="password" name="pass" id="pass" v-model="user.pass">
          <button type="submit" class="w3-btn w3-blue w3-block">Registrar Medico</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'AdminRegisterMedico',
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
    addUser () {
      let db = firebase.database().ref('Medicos/');
      let vm = this;
      firebase.auth().createUserWithEmailAndPassword(vm.user.email, vm.user.pass)
      .then(user => {
        let ref = db.push('Medicos');
        let paciente = {
          uuid : user.uid,
          type: 'm',
          email: user.email
        };
        ref.set(paciente);
        db = firebase.database().ref('Usuarios/');
        ref = db.push('Usuarios');
        ref.set(paciente);
        vm.goBack();
        })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        vm.error = errorMessage;
        vm.user.pass = '';
      });
    },
    goBack () {
      this.$router.push({name: 'AdminMenu'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-register{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
}
.regresar{
  position: absolute;
  height: 30px;
  top: 45px;
  left: 0;
}
.register-form{
  background-color: white;
  align-self: center;
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
  width: 100%;
  display: block;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
}
a:hover{
  color: blue;
}

.error{
  color: red;
  text-decoration: underline;
}

@media only screen and (max-width: 750px) {
  .register-form{
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
    margin-top: 0;
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
