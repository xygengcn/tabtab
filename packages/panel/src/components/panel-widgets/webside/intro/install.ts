import { IWidgetConfig } from '@/typings/widget';
import { defineAsyncComponent } from 'vue';

/**
 * 组件配置
 */
const WebsideIntroWidget: IWidgetConfig = {
  type: 'webside-intro',
  component: defineAsyncComponent(() => import('./index')),
  default: {
    id: 'webside-intro-01',
    type: 'webside-intro',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: 'TabTab',
      intro: '这是一个快乐的网站',
      url: 'https://xygeng.cn/'
    },
    w: 8,
    h: 3,
    minW: 5,
    minH: 3,
    maxH: 4
  }
};

export default WebsideIntroWidget;
