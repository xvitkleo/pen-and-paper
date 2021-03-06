import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/createaccount',
    name: 'CreateAccount',
    component: () => import('../views/CreateAccount.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'MyAccount',
        path: '/home/account',
        component: () => import('../views/MyAccount.vue'),
      },
      {
        name: 'JoinRoom',
        path: '/home/joinroom',
        component: () => import('../views/JoinRoom.vue'),
      },
      {
        name: 'CreateRoom',
        path: '/home/createroom',
        component: () => import('../views/CreateRoom.vue'),
      },
      {
        name: 'ContactUs',
        path: '/home/contactus',
        component: () => import('../views/ContactUs.vue'),
      },
      {
        name: 'Room',
        path: '/home/room',
        component: () => import('../views/Room.vue'),
        children: [
          {
            name: 'RoomFiles',
            path: '/home/room/files',
            component: () => import('../views/RoomFiles.vue'),
          },
          {
            name: 'ShareScreen',
            path: '/home/room/share',
            component: () => import('../views/ShareScreen.vue'),
          },
          {
            name: 'Repository',
            path: '/home/room/repository',
            component: () => import('../views/Repository.vue'),
          },
        ],
      },
      {
        name: 'Test',
        path: '/home/test',
        component: () => import('../views/test.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
