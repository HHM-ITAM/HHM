<template>
  <div class="medico-menu">
    <div class="opciones w3-padding">
      <button class="w3-btn w3-green opcion w3-round" @click.prevent="goToRegister">Registrar Paciente</button>
      <button class="w3-btn w3-grey w3-text-white opcion w3-round" @click.prevent="goToModificar">Modificar Paciente</button>
      <button class="w3-btn w3-green opcion w3-round">Nuevo Historial</button>
      <button class="w3-btn w3-grey w3-text-white opcion w3-round">Consulta Historial</button>
      <button class="w3-btn w3-green opcion w3-round">Modifica Historial</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'MedicoMenu',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    goToRegister () {
      this.$router.push({name: 'MedicoRegister'});
    },
    goToModificar () {
      this.$router.push({name: 'MedicoModificar'});
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
      else if(vm.data.type !== 'm') this.$router.push({name: 'Home'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.medico-menu{
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
