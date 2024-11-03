import { IWidgetConfig } from '@/typings/widget';
import { defineAsyncComponent } from 'vue';

/**
 * 组件配置
 */
const WebsideColumnWidget: IWidgetConfig = {
  type: 'webside-column',
  component: defineAsyncComponent(() => import('./index')),
  default: {
    id: 'webside-column-01',
    type: 'webside-column',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: '稀土掘金',
      url: 'https://xygeng.cn/'
    },
    w: 3,
    h: 3,
    minH: 3,
    minW: 3
  }
};

export default WebsideColumnWidget;
