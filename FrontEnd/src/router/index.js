import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import ItemView from '@/views/ItemView.vue';
import InfoView from '@/views/InfoView.vue';
import ProfileComponent from '@/pages/ProfileComponent.vue';
import CartComponent from '@/pages/CartComponent.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/products/:id',
    component: ItemView,
  },
  {
    path: '/info',
    component: InfoView,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: ProfileComponent,
      },
      {
        path: '/cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
