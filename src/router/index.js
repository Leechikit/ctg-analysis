import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ctg-compsystem',
    name: 'ctg-compsystem',
    component: () => import('@/views/ctgCompsystem')
  },
  {
    path: '/ctg-dragdrop',
    name: 'ctg-dragdrop',
    component: () => import('@/views/ctgDragdrop')
  },
  {
    path: '/ctg-mix',
    name: 'ctg-mix',
    component: () => import('@/views/ctgMix')
  },
  {
    path: '/vue-compsystem',
    name: 'vue-compsystem',
    component: () => import('@/views/vueCompsystem')
  },
  {
    path: '/vue-dragdrop',
    name: 'vue-dragdrop',
    component: () => import('@/views/vueDragdrop')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
