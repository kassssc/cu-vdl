import Vue from 'vue'
import Router from 'vue-router'

import MainContent from '@/modules/main/MainContent'

import { apolloProvider } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'

Vue.use(Router)

const LAST_ROUTE = 'cuvdl-last-route'

export const get_last_route = () => {
  return localStorage.getItem(LAST_ROUTE)
}

localStorage.removeItem(LAST_ROUTE)

const routes = [
  {
    path: '/',
    component: MainContent,
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'main',
        redirect: { name: 'home' },
        component: () => import(/* webpackChunkName: "group-home" */
          '@/modules/home/HomeContent'
        ),
        children: [
          {
            path: '',
            name: 'home',
            component: () => import(/* webpackChunkName: "group-home" */
              '@/modules/home/Home'
            ),
          },
          {
            path: 'services',
            name: 'services',
            component: () => import(/* webpackChunkName: "group-home" */
              '@/modules/home/Services'
            ),
          },
          {
            path: 'orgchart',
            name: 'org-chart',
            component: () => import(/* webpackChunkName: "group-home" */
              '@/modules/home/OrgChart'
            ),
          },
          {
            path: 'contact',
            name: 'contact',
            component: () => import(/* webpackChunkName: "group-home" */
              '@/modules/home/Contact'
            ),
          },
          {
            path: 'pathogen',
            name: 'pathogen-bank',
            component: () => import(/* webpackChunkName: "group-home" */
              '@/modules/home/PathogenBank'
            ),
          },
        ]
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
    meta: { cannot_be_logged_in: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "group-login" */
      '@/modules/login/Signup'
    ),
    meta: { cannot_be_logged_in: true }
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: () => import(/* webpackChunkName: "group-login" */
      '@/modules/login/ResetPassword'
    ),
    meta: { cannot_be_logged_in: true }
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
router.beforeEach( async (to, from, next) => {
  try {
    const res = await apolloProvider.defaultClient.query({
      query: AUTH_DATA
    })
    const { logged_in , is_admin } = res.data.auth
    const unauthorized = (
      (route_requires_login(to) && !logged_in) ||
      (route_requires_admin(to) && !is_admin)
    )

    const cannot_be_logged_in = route_cannot_be_logged_in(to) && logged_in
  
    if (unauthorized) {
      localStorage.setItem(LAST_ROUTE, to.fullPath)
      next({ name: 'login' })
    } else if (cannot_be_logged_in) {
      next({ name: 'home' })
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
const route_cannot_be_logged_in = route => {
  return route.matched.some(record => record.meta.cannot_be_logged_in)
}

export default router
