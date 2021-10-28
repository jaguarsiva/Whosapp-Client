
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
    },
    {
        path: '/room/:id',
        name: 'ChatRoom',
        component: () => import('@/pages/ChatRoom.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
	const isLoggedIn = localStorage.getItem('user');
    if( to.name !== 'Login' && !isLoggedIn ) next({ name: 'Login' });
    else if( to.name === 'Login' && isLoggedIn ) next({ name: 'Home' });
    else next();
});

export default router;