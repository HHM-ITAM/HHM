<template>
  <div class="medico">
    <p v-if="message" class="message">{{message}}</p>
    <div class="historiales">
      <div class="historial w3-border w3-border-grey" v-for="(historial, index) in historiales" :key="index">
        <p class="w3-left">{{historial.fecha}}</p>
        <button class="w3-button w3-grey w3-text-white w3-right w3-round">Revisar</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Medico',
  props: ['data'],
  data () {
    return {
      historiales: [],
      message: ''
    }
  },
  methods: {
  },
  mounted () {
    let vm = this;
    vm.user = firebase.auth().currentUser;
    //IF no user then redirect to Login
    if(!vm.user) this.$router.push({name: 'Login'});
    else{
      firebase.database().ref('Historiales').once('value')
      .then(snap => {
        snap.forEach(el => {
          let data = el.val();
          data.forEach(historial => console.log(historial.fecha))
          if(el.key === vm.data.uuid) data.forEach(historial => vm.historiales.push(historial))
          else vm.historiales = null;
          console.log(vm.historiales)
        });
        //No historiales, o historiales message
        if(!vm.historiales) vm.message = 'No existe aún ningún historial.';
        else vm.message = '';
      })
      .catch(error => console.log(error.message));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paciente{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.message{
  font-size: 40px;
  color: grey;
}
.historiales{
  height: 100%;
}
.historial{
  height: 42px;
  padding: 1px 10px 1px;
}
.historial p {
  height: 40px;
  margin: 0;
  padding: 8px 16px;
}
</style>
