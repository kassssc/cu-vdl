import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import MainContent from './views/MainContent.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: MainContent,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/tracksubmissions',
          component: () => import(/* webpackChunkName: "group-submissions" */ '@/views/Submissions.vue'),
          children: [
            {
              path: '',
              name: 'submissionslist',
              component: () => import(/* webpackChunkName: "group-submissions" */ '@/views/SubmissionsList.vue'),
              meta: { requiresLogin: true }
            },
            {
              path: 'view/:id',
              name: 'viewsubmission',
              component: () => import(/* webpackChunkName: "group-submissions" */ '@/views/ViewSubmission.vue'),
              meta: { requiresLogin: true }
            }
          ]
        },
        {
          path: '/submitsamples',
          component: () => import(/* webpackChunkName: "group-submitsamples" */ '@/views/SubmitSamples.vue'),
          children: [
            {
              path: '',
              name: 'submitsamples',
              component: () => import(/* webpackChunkName: "group-submitsamples" */ '@/views/SampleInfo.vue'),
              meta: { requiresLogin: true }
            }, 
            // {
            //   path: 'review',
            //   name: 'reviewsubmission',
            //   component: () => import(/* webpackChunkName: "group-submitsamples" */ '@/views/ReviewSubmission.vue'),
            //   meta: { requiresLogin: true }
            // }
          ]
        },
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "group-dashboard" */ '@/views/Dashboard.vue'),
          children: [
            {
              path: '',
              name: 'dashboard',
              component: () => import(/* webpackChunkName: "group-dashboard" */ '@/views/DashboardInfo.vue'),
              meta: { requiresLogin: true }
            },
            {
              path: 'edit',
              name: 'dashboard-edit',
              component: () => import(/* webpackChunkName: "group-dashboard" */ '@/views/DashboardEdit.vue'),
              meta: { requiresLogin: true }
            },
            {
              path: 'submitters',
              name: 'dashboard-submitters',
              component: () => import(/* webpackChunkName: "group-dashboard" */ '@/views/DashboardSubmitters.vue'),
              meta: { requiresLogin: true }
            },
            {
              path: 'add',
              name: 'dashboard-add',
              component: () => import(/* webpackChunkName: "group-dashboard" */ '@/views/DashboardAddSubmitter.vue'),
              meta: { requiresLogin: true }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "group-login" */ '@/views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "group-login" */ '@/views/Signup.vue'),
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  hash: false,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// Route Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) &&
      !store.getters.loggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
