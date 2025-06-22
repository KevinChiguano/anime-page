import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../modules/home/views/HomeView.vue'
import DetailItem from '../modules/Detail/views/DetailItem.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'detalle/:category/:id',
        name: 'Detalle',
        component: DetailItem
      }
    ]
  },
  // Puedes agregar más layouts si los necesitas, como para login
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
