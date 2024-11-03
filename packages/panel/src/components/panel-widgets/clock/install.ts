import { IWidgetConfig } from '@/typings/widget';
import { defineAsyncComponent } from 'vue';

/**
 * 组件配置
 */
const ClockWidget: IWidgetConfig = {
  type: 'clock',
  component: defineAsyncComponent(() => import('./index')),
  default: {
    id: 'clock-01',
    type: 'clock',
    properties: {},
    w: 4,
    h: 4,
    minH: 4,
    minW: 4
  }
};

export default ClockWidget;
