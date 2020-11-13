// eslint-disable-next-line no-unused-vars
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import one from '../components/one.vue'
import two from '../components/two.vue'
import record from '../components/Record.vue'
import judge from '../components/Judge.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: one
  }, {
    path: '/two',
    component: two
  }, {
    path: '/record',
    component: record
  }, {
    path: '/judge',
    component: judge
  }
]

const router = new VueRouter({
  routes
})

export default router
