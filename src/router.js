import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/store.js'
import MainContent from '@/modules/main/MainContent'
import Home from '@/modules/home/Home'

import { apolloProvider } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'

Vue.use(Router)

const routes = [
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
        component: () => import(/* webpackChunkName: "group-submissions" */
          '@/modules/submissions/Submissions'
        ),
        children: [
          {
            path: '',
            name: 'submissionslist',
            component: () => import(/* webpackChunkName: "group-submissions" */
              '@/modules/submissions/SubmissionsList'
            ),
            meta: { requiresLogin: true }
          },
          {
            path: 'view/:id',
            name: 'viewsubmission',
            component: () => import(/* webpackChunkName: "group-submissions" */
              '@/modules/submissions/ViewSubmission'
            ),
            meta: { requiresLogin: true }
          },
          {
            path: 'edit/:id',
            name: 'editsubmission',
            component: () => import(/* webpackChunkName: "group-submitsamples" */
              '@/modules/submitsamples/SubmitSamples'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          }
        ]
      },

      {
        path: '/submitsamples',
        name: 'submit-samples',
        component: () => import(/* webpackChunkName: "group-submitsamples" */
          '@/modules/submitsamples/SubmitSamples'
        ),
        meta: { requiresLogin: true }
      },
      
      {
        path: '/account',
        name: 'account',
        component: () => import(/* webpackChunkName: "group-account" */
          '@/modules/account/Account'
        ),
        meta: { requiresLogin: true }
      },

      {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "group-admin" */
          '@/modules/admin/AdminPanel'
        ),
        redirect: { name: 'admin-users-list' },
        meta: { requiresLogin: true, requiresAdmin: true },
        children: [
          {
            path: 'users/:filter?/:query?/:id?',
            name: 'admin-users-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminUsersList'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          },
          {
            path: 'orgs/:id?',
            name: 'admin-orgs-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminOrgsList'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          },
          {
            path: 'create-user',
            name: 'admin-create-user',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminCreateUser'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          },
          {
            path: 'create-org',
            name: 'admin-create-org',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminCreateOrg'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "group-login" */
      '@/modules/login/Login'
    ),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "group-login" */
      '@/modules/login/Signup'
    ),
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new Router({
  routes,
  base: process.env.BASE_URL,
  hash: false,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// Route Guard
router.beforeEach(async (to, from, next) => {
  try {
    const res = await apolloProvider.defaultClient.query({
      query: AUTH_DATA
    })
    const { loggedIn, isAdmin } = res.data.auth
    const unauthorized = (
      (routeRequiresLogin(to) && !loggedIn) ||
      (routeRequiresAdmin(to) && !isAdmin)
    )
  
    if (unauthorized) {
      next({ name: 'login' })
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
    next({ name: 'login' })
  }
})

const routeRequiresLogin = route => {
  return route.matched.some(record => record.meta.requiresLogin)
}
const routeRequiresAdmin = route => {
  return route.matched.some(record => record.meta.requiresAdmin)
}

export default router
