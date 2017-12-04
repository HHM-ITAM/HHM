<template>
  <div class="medico-consulta-historial">
    <div class="w3-card register-form">
      <button class="w3-btn w3-red regresar" @click.prevent="goBack">Regresar</button>  
      <header class="w3-container w3-blue header">
        <h1>Consulta Historial</h1>
      </header>
      <div class="historiales" v-if="paciente && !busca">
        <div class="historial w3-border w3-border-grey" v-for="(hist, index) in historiales" :key="index">
          <p class="w3-left">{{hist.fecha}}</p>
          <button class="w3-button w3-grey w3-text-white w3-right w3-round" @click.prevent="revisa(hist)">Revisar</button>
        </div>
      </div>
      <div class="w3-container form" v-if="busca">
        <form @submit.prevent="creaHistorial">
          <p v-if="error" class="error">{{error}}</p>
          <label for="notas">Notas:</label>
          <input type="text" name="notas" id="notas" v-model="historial.notas">
          <button type="submit" class="w3-btn w3-blue w3-block">Crear Historial</button>
        </form>
      </div>
      <div class="w3-container form" v-if="!paciente">
        <form @submit.prevent="buscaPaciente">
          <p v-if="error" class="error">{{error}}</p>
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="user.email">
          <button type="submit" class="w3-btn w3-blue w3-block" v-if="user.email">Buscar Paciente</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  props: ['data'],
  data () {
    return {
      user: {
        email: ''
      },
      error: '',
      paciente: null,
      historial: {
        notas: '',
        fecha: '',
        doctor: ''
      },
      historiales : [],
      busca: false
    }
  },
  methods: {
    revisa (hist) {
      let vm = this;
      let db = firebase.database().ref('Pacientes/');
    },
    creaHistorial () {
      let vm = this;
      let user = vm.data;
      let date = Date();
      console.log(date);
      let ref = firebase.database().ref('Historiales/' + vm.paciente.uuid + '/').push();
      let historial = {
        doctor: user.uuid,
        fecha: date,
        notas: vm.historial.notas
      }
      ref.set(historial);
      vm.goBack();
    },
    buscaPaciente () {
      let db = firebase.database().ref('Pacientes/');
      let vm = this;
      let found = false;
      firebase.database().ref('Pacientes').once('value')
      .then(snap => {
        snap.forEach(el => {
          if(!found){
            let data = el.val();
            if(data.email === vm.user.email){
              vm.paciente = data;
              vm.paciente.key = el.key;
              found = true;
            }
            else vm.paciente = null;
          }
        });
        if(!vm.paciente) vm.error = 'No existe ese paciente';
        else {
          firebase.database().ref('Historiales').once('value')
          .then(snap => {
            snap.forEach(el => {
              let data = el.val();
              if(el.key === vm.paciente.uuid) {
                let i;
                for(i in data)
                {
                  let h = data[i];
                  h.key = i;
                  vm.historiales.push(h);
                }
                //data.forEach(historial => vm.historiales.push(historial));
              }
              else vm.historiales = null;
            });
            //No historiales, o historiales message
            if(!vm.historiales) vm.message = 'No existe aún ningún historial.';
            else vm.message = '';
          })
          .catch(error => console.log(error.message));
        }
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        vm.error = errorMessage;
      });
    },
    goBack () {
      this.$router.push({name: 'MedicoMenu'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.medico-consulta-historial{
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

.historiales{
  height: 100%;
}
.historial{
  height: 100px;
  padding: 1px 10px 1px;
}
.historial p {
  height: 40px;
  width: 60%;
  margin: 0;
  padding: 8px 16px;
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
