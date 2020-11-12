import Vue from 'vue'
import Router from 'vue-router'

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
        path: '/submissions',
        component: () => import(/* webpackChunkName: "group-submissions" */
          '@/modules/submissions/Submissions'
        ),
        children: [
          {
            path: '',
            name: 'submissions-list',
            component: () => import(/* webpackChunkName: "group-submissions" */
              '@/modules/submissions/SubmissionsList'
            ),
            meta: { requires_login: true }
          },
          {
            path: 'view/:id',
            name: 'view-submission',
            component: () => import(/* webpackChunkName: "group-submissions" */
              '@/modules/submissions/ViewSubmission'
            ),
            meta: { requires_login: true }
          },
          {
            path: 'edit/:id',
            name: 'edit-submission',
            component: () => import(/* webpackChunkName: "group-submitsamples" */
              '@/modules/submitsamples/SubmitSamples'
            ),
            meta: { requires_login: true, requires_admin: true },
          }
        ]
      },

      {
        path: '/submitsamples',
        name: 'submit-samples',
        component: () => import(/* webpackChunkName: "group-submitsamples" */
          '@/modules/submitsamples/SubmitSamples'
        ),
        meta: { requires_login: true }
      },
      
      {
        path: '/account',
        name: 'account',
        component: () => import(/* webpackChunkName: "group-account" */
          '@/modules/account/Account'
        ),
        meta: { requires_login: true }
      },

      {
        path: '/invoice/:id?',
        name: 'invoice-list',
        component: () => import(/* webpackChunkName: "group-invoice" */
          '@/modules/invoice/InvoiceList'
        ),
        meta: { requires_login: true }
      },

      {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "group-admin" */
          '@/modules/admin/AdminPanel'
        ),
        redirect: { name: 'admin-users-list' },
        meta: { requires_login: true, requires_admin: true },
        children: [
          {
            path: 'users/:id?',
            name: 'admin-users-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminUsersList'
            ),
            meta: { requires_login: true, requires_admin: true },
          },
          {
            path: 'contacts/:id?',
            name: 'admin-contacts-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminContactsList'
            ),
            meta: { requires_login: true, requires_admin: true },
          },
          {
            path: 'invoice/:id?',
            name: 'admin-invoice-list',
            component: () => import(/* webpackChunkName: "group-invoice" */
              '@/modules/invoice/InvoiceList'
            ),
            meta: { requires_login: true, requires_admin: true },
          },
          {
            path: 'create-user',
            name: 'admin-create-user',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminCreateUser'
            ),
            meta: { requires_login: true, requires_admin: true },
          },
          {
            path: 'create-contact',
            name: 'admin-create-contact',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminCreateContact'
            ),
            meta: { requires_login: true, requires_admin: true },
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
    path: '/reset',
    name: 'reset/:token',
    component: () => import(/* webpackChunkName: "group-login" */
      '@/modules/login/ResetPassword'
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
    const { logged_in , is_admin } = res.data.auth
    const unauthorized = (
      (route_requires_login(to) && !logged_in) ||
      (route_requires_admin(to) && !is_admin)
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

const route_requires_login = route => {
  return route.matched.some(record => record.meta.requires_login)
}
const route_requires_admin = route => {
  return route.matched.some(record => record.meta.requires_admin)
}

export default router
