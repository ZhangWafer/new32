import VueRouter from 'vue-router'
import Vue from 'vue'
import one from '../components/one.vue'
import two from '../components/two.vue'
import record from '../components/Record.vue'
import judge from '../components/Judge.vue'
import czrecord from '../components/CZRecord.vue'

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
  },{
    path: '/czrecord',
    component: czrecord
  },
]

const router = new VueRouter({
  routes
})

export default router
