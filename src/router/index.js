import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: '404',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: {Login: true}
    },
    {
      path: '/Registro',
      name: 'Register',
      component: Register,
      props: {Register: true}
    }
  ]
})
