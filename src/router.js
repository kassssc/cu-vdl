import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import MainContent from './views/MainContent.vue'
import Home from './views/Home.vue'
import Submissions from './views/Submissions.vue'
import SubmissionsList from './views/SubmissionsList.vue'
import ViewSubmission from './views/ViewSubmission.vue'
import SubmitSamples from './views/SubmitSamples.vue'
import SampleInfo from './views/SampleInfo.vue'
import ReviewSubmission from './views/ReviewSubmission.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainContent,
      children :  [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/tracksubmissions',
          component: Submissions,
          children: [
            {
              path: '',
              name: 'submissionslist',
              component: SubmissionsList
            },
            {
              path: 'view/:id',
              name: 'viewsubmission',
              component: ViewSubmission
            }
          ]
        },
        {
          path: '/submitsamples',
          component: SubmitSamples,
          children: [
            {
              path: '',
              name: 'submitsamples',
              component: SampleInfo
            }, 
            {
              path: 'review',
              name: 'reviewsubmission',
              component: ReviewSubmission
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  hash: false,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
