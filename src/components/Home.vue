<template>
  <div class="home">
    <h1>HOME</h1>
    <button @click.prevent="logOut">LogOut</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  methods: {
    logOut () {
      firebase.auth().signOut()
      .then(() => {
        console.log('SignOut');
        this.$router.push({name: 'Login'});
      })
      .catch((error) => this.logOut());
    }
  },
  mounted () {
    let currentUser = firebase.auth().currentUser;
    if(!currentUser) this.$router.push({name: 'Login'});
    let vm = this;
    console.log('Signed In');
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
}

</style>
