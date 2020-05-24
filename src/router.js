import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'

import MainContent from '@/modules/main/MainContent'
import Home from '@/modules/home/Home'

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
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "group-dashboard" */
          '@/modules/dashboard/Dashboard'
        ),
        children: [
          {
            path: '',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "group-dashboard" */
              '@/modules/dashboard/DashboardInfo'
            ),
            meta: { requiresLogin: true },
          },
          {
            path: 'edit',
            name: 'dashboard-edit',
            component: () => import(/* webpackChunkName: "group-dashboard" */
              '@/modules/dashboard/DashboardEdit'
            ),
            meta: { requiresLogin: true }
          },

          {
            path: 'employee/org',
            name: 'dashboard-employee-org',
            component: () => import(/* webpackChunkName: "group-dashboard" */
              '@/modules/dashboard/DashboardEmployeeOrg'
            ),
            meta: { requiresLogin: true }
          },
          {
            path: 'freelance/orgs',
            name: 'dashboard-freelance-orgs',
            component: () => import(/* webpackChunkName: "group-dashboard" */
              '@/modules/dashboard/DashboardFreelanceOrgs'
            ),
            meta: { requiresLogin: true }
          }
        ]
      },

      {
        path: '/admin',
        component: () => import(/* webpackChunkName: "group-admin" */
          '@/modules/admin/AdminPanel'
        ),
        meta: { requiresLogin: true, requiresAdmin: true },
        children: [
          {
            path: '',
            name: 'admin',
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
          {
            path: 'users',
            name: 'admin-users-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminUsersList'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          },
          {
            path: 'orgs',
            name: 'admin-orgs-list',
            component: () => import(/* webpackChunkName: "group-admin" */
              '@/modules/admin/AdminOrgsList'
            ),
            meta: { requiresLogin: true, requiresAdmin: true },
          }    
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
router.beforeEach((to, from, next) => {
  // Login check
  if (to.matched.some(record => record.meta.requiresLogin) &&
      !store.getters.loggedIn) {
    next({ name: 'login' })

  // CU admin check
  } else if (to.matched.some(record => record.meta.requiresAdmin) &&
      !store.getters.userIsAdmin) {
    next({ name: 'login' })

  } else {
    next()
  }
})

export default router
