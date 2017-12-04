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
  name: 'Home',
  data () {
    return {
      user : {}
    }
  },
  methods: {
  },
  mounted () {
    this.user = firebase.auth().currentUser;
    if(!user) this.$router.push({name: 'Login'});
    let vm = this;
    console.log('Signed In');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  margin: 0;
  padding: 45px 0 0;
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
