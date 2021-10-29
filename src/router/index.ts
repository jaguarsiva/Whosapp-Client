
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login.vue')
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('user');
    if( to.name !== 'Login' && !isLoggedIn ) next({ name: 'Login' });
    else if( to.name === 'Login' && isLoggedIn ) next({ name: 'Home' });
    else next();
});

export default router;