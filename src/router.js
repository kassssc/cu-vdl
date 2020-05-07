import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'

import MainContent from '@/views/MainContent'
import Home from '@/views/Home'

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
          component: () => import(/* webpackChunkName: "group-submissions" */
            '@/views/Submissions'
          ),
          children: [
            {
              path: '',
              name: 'submissionslist',
              component: () => import(/* webpackChunkName: "group-submissions" */
                '@/views/SubmissionsList'
              ),
              meta: { requiresLogin: true }
            },
            {
              path: 'view/:id',
              name: 'viewsubmission',
              component: () => import(/* webpackChunkName: "group-submissions" */
                '@/views/ViewSubmission'
              ),
              meta: { requiresLogin: true }
            }
          ]
        },

        {
          path: '/submitsamples',
          name: 'submitsamples',
          component: () => import(/* webpackChunkName: "group-submitsamples" */
            '@/views/SubmitSamples'
          ),
          meta: { requiresLogin: true }
        },

        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "group-dashboard" */
            '@/views/dashboard/Dashboard'
          ),
          children: [
            {
              path: '',
              name: 'dashboard',
              component: () => import(/* webpackChunkName: "group-dashboard" */
                '@/views/dashboard/DashboardInfo'
              ),
              meta: { requiresLogin: true },
            },
            {
              path: 'edit',
              name: 'dashboard-edit',
              component: () => import(/* webpackChunkName: "group-dashboard" */
                '@/views/dashboard/DashboardEdit'
              ),
              meta: { requiresLogin: true }
            },

            {
              path: 'employee/submitters',
              name: 'dashboard-employee-submitters',
              component: () => import(/* webpackChunkName: "group-employee" */
                '@/views/dashboard/DashboardEmployeeSubmitters'
              ),
              meta: { requiresLogin: true }
            },
            {
              path: 'employee/addsubmitter',
              name: 'dashboard-employee-addsubmitter',
              component: () => import(/* webpackChunkName: "group-employee" */
                '@/views/dashboard/DashboardEmployeeAddSubmitter'
              ),
              meta: { requiresLogin: true }
            },

            {
              path: 'freelance/orgs',
              name: 'dashboard-freelance-orgs',
              component: () => import(/* webpackChunkName: "group-freelance" */
                '@/views/dashboard/DashboardFreelanceOrgs'
              ),
              meta: { requiresLogin: true }
            },
            {
              path: 'freelance/addorg',
              name: 'dashboard-freelance-addorg',
              component: () => import(/* webpackChunkName: "group-freelance" */
                '@/views/dashboard/DashboardFreelanceAddOrg'
              ),
              meta: { requiresLogin: true }
            }
          ]
        },

        {
          path: '/admin',
          component: () => import(/* webpackChunkName: "group-admin" */
            '@/views/admin/AdminPanel'
          ),
          meta: { requiresLogin: true, requiresAdmin: true },
          children: [
            {
              path: '',
              name: 'admin-create-user',
              component: () => import(/* webpackChunkName: "group-admin" */
                '@/views/admin/AdminCreateUser'
              ),
              meta: { requiresLogin: true, requiresAdmin: true },
            },
            {
              path: 'users',
              name: 'admin-users-list',
              component: () => import(/* webpackChunkName: "group-admin" */
                '@/views/admin/AdminUsersList'
              ),
              meta: { requiresLogin: true, requiresAdmin: true },
            },
            {
              path: 'orgs',
              name: 'admin-orgs-list',
              component: () => import(/* webpackChunkName: "group-admin" */
                '@/views/admin/AdminOrgsList'
              ),
              meta: { requiresLogin: true, requiresAdmin: true },
            }    
          ]
        },
        {
          path: '/adminrequests',
          name: 'admin-requests',
          component: () => import(/* webpackChunkName: "group-admin" */
            '@/views/admin/AdminRequests'
          ),
          meta: { requiresLogin: true, requiresAdmin: true },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "group-login" */
        '@/views/Login'
      ),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "group-login" */
        '@/views/Signup'
      ),
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
