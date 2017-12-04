<template>
  <div class="paciente">
    <p v-if="message" class="message">{{message}}</p>
    <div class="historiales" v-if="!busca">
      <div class="historial w3-border w3-border-grey" v-for="(historial, index) in historiales" :key="index">
        <p class="w3-left">{{historial.fecha}}</p>
        <button class="w3-button w3-grey w3-text-white w3-right w3-round"@click.prevent="revisa(historial)">Revisar</button>
      </div>
    </div>
    <div class="w3-container form" v-if="busca">
        <form>
          <label for="fecha">Fecha:</label>
          <input type="text" name="fecha" id="fecha" v-model="historial.fecha" disabled>
          <label for="notas">Notas:</label>
          <input type="text" name="notas" id="notas" v-model="historial.notas" disabled>
        </form>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Paciente',
  props: ['data'],
  data () {
    return {
      historiales: [],
      message: '',
      busca: false
    }
  },
  methods: {
    revisa (hist) {
      let vm = this;
      let db = firebase.database().ref('Historiales/' + vm.data.uuid + '/' + hist.key + '/');
      let ref = db.once('value')
      .then(snap => {
        vm.historial = snap.val();
        vm.busca = true;
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        vm.error = errorMessage;
      });
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
      firebase.database().ref('Historiales').once('value')
      .then(snap => {
        snap.forEach(el => {
          let data = el.val();
          if(el.key === vm.data.uuid) {
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
  height: 100px;
  padding: 1px 10px 1px;
}
.historial p {
  height: 40px;
  width: 60%;
  margin: 0;
  padding: 8px 16px;
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
</style>
