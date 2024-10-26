import { createApp, defineAsyncComponent } from 'vue';
import './index.scss';

/**
 * 显示插件库
 */
export default function showPanelStore() {
  console.log('[showPanelStore]');
  const instance = document.querySelector('#panel-store');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'panel-store';
  document.body.appendChild(el);
  const AppComp = defineAsyncComponent(() => import('./content'));
  const app = createApp(AppComp, {
    onClose() {
      el.classList.add('slide-out');
      /**
       * 动画结束后移走元素
       */
      el.addEventListener('animationend', function (event) {
        app.unmount();
        el && document.body.removeChild(el);
      });
    }
  });
  app.mount(el);
}
