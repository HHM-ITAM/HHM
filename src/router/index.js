import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
//PACIENTE
import Paciente from '@/components/Paciente'
//MEDICO
import Medico from '@/components/Medico'
import MedicoMenu from '@/components/MedicoMenu'
import MedicoRegister from '@/components/MedicoRegister'
import MedicoModificar from '@/components/MedicoModificar'
import MedicoCreaHistorial from '@/components/MedicoCreaHistorial'
import MedicoConsultaHistorial from '@/components/MedicoConsultaHistorial'
import MedicoModificaHistorial from '@/components/MedicoModificaHistorial'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      name: '404',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        //PACIENTE
        {
          path: '/Paciente',
          name: 'Paciente',
          component: Paciente
        },
        //MEDICO
        {
          path: '/Medico',
          name: 'Medico',
          component: Medico,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/RegistroPaciente',
              name: 'MedicoRegister',
              component: MedicoRegister,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/Menu',
              name: 'MedicoMenu',
              component: MedicoMenu,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/MoficaPaciente',
              name: 'MedicoModificar',
              component: MedicoModificar,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/NuevoHistorial',
              name: 'MedicoCreaHistorial',
              component: MedicoCreaHistorial,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/ConsultaHistorial',
              name: 'MedicoConsultaHistorial',
              component: MedicoConsultaHistorial,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/ModificaHistorial',
              name: 'MedicoModificaHistorial',
              component: MedicoModificaHistorial,
              meta: {
                requiresAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from ,next) => {
  console.log('Routing');
  let currentUser = firebase.auth().currentUser;
  //Do route requires Authentcation?
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('Login')
  else if (!requiresAuth && currentUser) next('Home')
  else next()
})

export default router
