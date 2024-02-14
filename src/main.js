import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify' 
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// fontawesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

window.Kakao.init('80ff5ad9f0d9c8492311e33c05663914');
// window.Kakao.init('da296dbd3262bf3f3786c015d6484542');


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.use(Vuetify);
app.use(VueSweetalert2);
app.mount('#app')