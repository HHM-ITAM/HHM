<template>
  <div class="home">
    <h1>HOME</h1>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  methods: {
  },
  mounted () {
    let currentUser = firebase.auth().currentUser;
    if(!currentUser) this.$router.push({name: 'Login'});
    let vm = this;
    console.log('Signed In');
    firebase.auth().signOut()
    .then(() => {
      console.log('Signed Out');
      this.$router.push({name: 'Login'});
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
