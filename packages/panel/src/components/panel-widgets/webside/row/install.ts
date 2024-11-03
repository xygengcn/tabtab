import { IWidgetConfig } from '@/typings/widget';
import { defineAsyncComponent } from 'vue';

/**
 * 组件配置
 */
const WebsideRowWidget: IWidgetConfig = {
  type: 'webside-row',
  component: defineAsyncComponent(() => import('./index')),
  default: {
    id: 'webside-row-01',
    type: 'webside-row',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: '稀土掘金',
      url: 'https://xygeng.cn/'
    },
    w: 5,
    h: 2,
    maxH: 2,
    minH: 2,
    minW: 4
  }
};

export default WebsideRowWidget;
