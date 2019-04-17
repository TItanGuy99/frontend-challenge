import Vue from 'vue'
import Router from 'vue-router'
import ListTranscriptions from '@/components/ListTranscriptions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listtranscriptions',
      component: ListTranscriptions
    }
  ]
})
