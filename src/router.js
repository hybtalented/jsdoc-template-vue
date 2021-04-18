import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function createRouter(routes) {
    return new Router({
        mode: 'hash',
        routes
    })
}