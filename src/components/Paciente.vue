<template>
  <div class="paciente">
    <div class="historiales">
      <div class="historial w3-border w3-border-grey">
        <p class="w3-left">Fecha</p>
        <button class="w3-button w3-grey w3-text-white w3-right w3-round">Revisar</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Paciente',
  data () {
    return {
      user : {}
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
      firebase.database().ref('Pacientes').once('value')
      .then(snap => {
        snap.forEach(el => {
          let data = el.val();
          if(data.uuid === vm.user.uid) vm.data = data;
          else vm.data = null;
          //No database record !SOMETHING IS WRONG!
          if(!vm.data) console.log('Call the bomberos')
        });
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
.navbar{
  height: 45px;
}
.link{
  height: 45px;
  font-size: 20px;
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
