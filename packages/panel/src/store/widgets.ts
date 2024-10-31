import { IWidget } from '@/typings/widget';
import { defineStore } from 'pinia';

/**
 * 插件库
 */
export const useWidgetStore = defineStore('panel-store', {
  state: () => ({
    storeWdigets: [
      { id: '01', type: 'clock', properties: {}, w: 4, h: 4 },
      {
        id: '02',
        type: 'webside-row',
        properties: {
          imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
          name: '稀土掘金',
          url: 'https://baidu.com'
        },
        w: 5,
        h: 2,
        maxH: 2
      },
      {
        id: '03',
        type: 'webside-column',
        noResize: true,
        properties: {
          imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
          name: '稀土掘金',
          url: 'https://baidu.com'
        },
        w: 3,
        h: 3
      }
    ] as IWidget[]
  }),
  actions: {}
});
