import { IWidget } from '@/typings/widget';
import { createApp, defineAsyncComponent } from 'vue';

/**
 * 显示插件设置
 */
export default async function showPanelWidgetSetting(widget: IWidget) {
  console.log('[showPanelWidgetSetting]', widget);
  const instance = document.querySelector('#panel-widget-setting');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'panel-widget-setting';
  document.body.appendChild(el);
  const AppComp = defineAsyncComponent(() => import('./content'));
  const app = createApp(AppComp, {
    widget,
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
}
