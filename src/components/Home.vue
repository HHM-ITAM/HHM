<template>
  <div class="home">
    <div class="w3-top navbar">
      <div class="w3-bar w3-blue nabvar">
        <a class="w3-bar-item w3-button link">{{user.email}}</a>
        <a class="w3-bar-item w3-button w3-right link" @click.prevent="logOut">Salir</a>
      </div>
    </div>
    <router-view :data="data"/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  data () {
    return {
      user : {},
      data: null
    }
  },
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
    let vm = this;
    vm.user = firebase.auth().currentUser;
    //IF no user then redirect to Login
    if(!vm.user) this.$router.push({name: 'Login'});
    else {
      let found = false;
      firebase.database().ref('Usuarios').once('value')
      .then(snap => {
        snap.forEach(el => {
          if(!found){
            let data = el.val();
            if(data.uuid === vm.user.uid){
              vm.data = data;
              found = true;
            }
            else vm.data = null;
          }
        });
        //No database record !SOMETHING IS WRONG!
        if(!vm.data) console.log('Call the bomberos')
        //Look for type of user
        else {
          switch(vm.data.type){
            //PACIENTE
            case 'p':
              vm.$router.push({name: 'Paciente'});
              break;
            case 'm':
              vm.$router.push({name: 'Medico'});
              break;
            default:
              vm.logOut();
          }
        }
      })
      .catch(error => console.log(error.message));
    }
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
