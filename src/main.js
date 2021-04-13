import {createApp} from 'vue'
import App from './App.vue'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css'
import './assets/css/style1.css'

import Router from './routes/router'


createApp(App)
    .use(Router)

    .mount('#app')
