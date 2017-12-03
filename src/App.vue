<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import Firebase from 'firebase'
let config = {
    apiKey: "AIzaSyAmvXGeHW_UURXQ1F-o4r4xfDwSpVGen48",
    authDomain: "hhm-software.firebaseapp.com",
    databaseURL: "https://hhm-software.firebaseio.com",
    projectId: "hhm-software",
    storageBucket: "",
    messagingSenderId: "600530060886"
  };
  
let app = Firebase.initializeApp(config)
let db = app.database()


export default {
  name: 'app'
}
</script> 

<style>
@import './assets/styles/w3.css';

html{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
