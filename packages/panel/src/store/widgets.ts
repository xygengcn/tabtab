import { IWidget } from '@/typings/widget';
import { defineStore } from 'pinia';

/**
 * 插件库
 */
export const useWidgetStore = defineStore('panel-store', {
  state: () => ({
    store: [
      { id: '111111', type: 'clock', properties: {}, w: 2, h: 2 },
      { id: '222222', type: 'webside', properties: {}, w: 3, h: 2 },
      { id: '22221222', type: 'webside', properties: {}, w: 2, h: 1 },
      { id: '345', type: 'webside', properties: {}, w: 5, h: 1 },
      { id: '2222', type: 'webside', properties: {}, w: 2, h: 2 }
    ] as IWidget[]
  }),
  actions: {}
});
