import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AddMovie from '../views/AddMovie.vue';
import Movie from '../views/Movie.vue';
import Account from '../views/Account.vue';
import EditMovie from '../views/EditMovie.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/movies',
        name: 'Movies',
        component: Home,
    },
    {
        path: '/movies/:id',
        name: 'Movie',
        component: Movie,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/account',
        name: 'Account',
        beforeEnter: isLogged,
        component: Account,
    },
    {
        path: '/addmovie',
        name: 'AddMovie',
        beforeEnter: isAdmin,
        component: AddMovie,
    },
    {
        path: '/movies/:id/edit',
        name: 'EditBook',
        beforeEnter: isAdmin,
        component: EditMovie,
    },
];
import store from '../store/index';

function isAdmin(to, from, next) {
    if (store.state.isAdmin) {
        next();
    } else {
        next({ path: '/' });
    }
}

function isLogged(to, from, next) {
    if (store.state.isLoggedIn) {
        next();
    } else {
        next({ path: '/login' });
    }
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
