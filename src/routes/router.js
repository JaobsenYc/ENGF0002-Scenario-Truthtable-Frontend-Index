import {
    createRouter,
    createWebHashHistory,
} from "vue-router"
// import Cag from '../admin/Cag.vue'

const listRoutes = [
    {
        path:'/',
        component: () => import('../components/index.vue')
    },     
    {
        path:'/quiz/:id/',
        component: () => import('../components/quiz.vue')
    },         
];

const Routes = new createRouter({
    history: createWebHashHistory(), 
    // history: createWebHistory(),
    routes: listRoutes,
});



export default Routes