<template>
  <div class="admin-menu">
    <div class="opciones w3-padding">
      <button class="w3-btn w3-green opcion w3-round" @click.prevent="goToRegisterPaciente">Registrar Paciente</button>
      <button class="w3-btn w3-grey w3-text-white opcion w3-round" @click.prevent="goToModificarPaciente">Modificar Paciente</button>
      <button class="w3-btn w3-green opcion w3-round" @click.prevent="goToRegisterMedico">Registrar Medico</button>
      <button class="w3-btn w3-grey w3-text-white opcion w3-round" @click.prevent="goToModificarMedico">Modificar Medico</button>
      <button class="w3-btn w3-green opcion w3-round" @click.prevent="goToCrearHistorial">Nuevo Historial</button>
      <button class="w3-btn w3-grey w3-text-white opcion w3-round" @click.prevent="goToConsultaHistorial">Consulta Historial</button>
      <button class="w3-btn w3-green opcion w3-round" @click.prevent="goToModificaHistorial">Modifica Historial</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'AdminMenu',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    goToRegisterPaciente () {
      this.$router.push({name: 'AdminRegisterPaciente'});
    },
    goToModificarPaciente () {
      this.$router.push({name: 'AdminModificarPaciente'});
    },
    goToRegisterMedico () {
      this.$router.push({name: 'AdminRegisterMedico'});
    },
    goToModificarMedico () {
      this.$router.push({name: 'AdminModificarMedico'});
    },
    goToCrearHistorial () {
      this.$router.push({name: 'AdminCreaHistorial'});
    },
    goToConsultaHistorial () {
      this.$router.push({name: 'AdminConsultaHistorial'});
    },
    goToModificaHistorial () {
      this.$router.push({name: 'AdminModificaHistorial'});
    }
  },
  mounted () {
    let vm = this;
    vm.user = firebase.auth().currentUser;
    //IF no user then redirect to Login
    if(!vm.user) this.$router.push({name: 'Login'});
    else{
      //There is no data prop, return to home to reload prop
      if(!vm.data) this.$router.push({name: 'Home'});
      //Check if type of medico
      else if(vm.data.type !== 'a') this.$router.push({name: 'Home'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-menu{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.opciones{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.opcion{
  height: 100px;
  width: 100%;
}
</style>
