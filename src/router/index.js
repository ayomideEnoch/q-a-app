import Vue from 'vue'
import VueRouter from 'vue-router'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'
import Page3 from '../views/Page3.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Page1',
    component: Page1
  },
  {
    path: '/question',
    name: 'Question',
    component: Page2
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Page3
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router