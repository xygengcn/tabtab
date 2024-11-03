import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App';
import './sw';

const app = createApp(App);
// 注册pinia
const pinia = createPinia();

app.use(pinia).mount('#app');
