import { createApp } from 'vue';
import App from './App';
import './sw';
import { createPinia } from 'pinia';

const app = createApp(App);
// 注册pinia
const pinia = createPinia();

app.use(pinia).mount('#app');
