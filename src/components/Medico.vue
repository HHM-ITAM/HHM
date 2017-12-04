<template>
  <div class="medico">
    <router-view :data="data"/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Medico',
  props: ['data'],
  data () {
    return {
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
      //There is no data prop, return to home to reload prop
      if(!vm.data) this.$router.push({name: 'Home'});
      //Check if type of medico
      else if(vm.data.type !== 'm') this.$router.push({name: 'Home'});
      this.$router.push({name: 'MedicoMenu'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.medico{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
