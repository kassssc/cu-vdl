import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home.vue'
import About from './views/About.vue'
import TrackSubmissions from './views/TrackSubmissions.vue'
import SubmitSamples from './views/SubmitSamples.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children :  [
        {
          path: '/',
          name: 'about',
          component: About
        },
        {
          path: '/tracksubmissions',
          name: 'tracksubmissions',
          component: TrackSubmissions
        },
        {
          path: '/submitsamples',
          name: 'submitsamples',
          component: SubmitSamples
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
