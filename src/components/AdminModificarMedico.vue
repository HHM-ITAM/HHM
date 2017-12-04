<template>
  <div class="admin-modificar">
    <div class="w3-card register-form">
      <button class="w3-btn w3-red regresar" @click.prevent="goBack">Regresar</button>  
      <header class="w3-container w3-blue header">
        <h1>Modificación</h1>
      </header>
      <div class="w3-container form" v-if="medico">
        <form @submit.prevent="modificaMedico">
          <p v-if="error" class="error">{{error}}</p>
          <label for="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" v-model="medico.nombre">
          <label for="sangre">Hospital:</label>
          <input type="text" name="sangre" id="sangre" v-model="medico.hospital">
          <button type="submit" class="w3-btn w3-blue w3-block">Modificar Medico</button>
        </form>
      </div>
      <div class="w3-container form" v-if="!medico">
        <form @submit.prevent="buscaMedico">
          <p v-if="error" class="error">{{error}}</p>
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <button type="submit" class="w3-btn w3-blue w3-block" v-if="user.email">Buscar Medico</button>
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
        email: ''
      },
      error: '',
      medico: null
    }
  },
  methods: {
    modificaMedico () {
      let vm = this;
      let ref = firebase.database().ref('Medicos/' + vm.medico.key + '/');
      ref.set(vm.medico);
      vm.goBack();
    },
    buscaMedico() {
      let db = firebase.database().ref('Medicos/');
      let vm = this;
      let found = false;
      firebase.database().ref('Medicos').once('value')
      .then(snap => {
        snap.forEach(el => {
          if(!found){
            let data = el.val();
            if(data.email === vm.user.email){
              vm.medico = data;
              vm.medico.key = el.key;
              found = true;
            }
            else vm.medico = null;
          }
        });
        if(!vm.medico) vm.error = 'No existe ese medico';
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        vm.error = errorMessage;
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
.admin-modificar{
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
