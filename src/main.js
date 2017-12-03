// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(VueFire)

let app;
let config = {
    apiKey: "AIzaSyAmvXGeHW_UURXQ1F-o4r4xfDwSpVGen48",
    authDomain: "hhm-software.firebaseapp.com",
    databaseURL: "https://hhm-software.firebaseio.com",
    projectId: "hhm-software",
    storageBucket: "",
    messagingSenderId: "600530060886"
  };

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function(user){ 
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
});

