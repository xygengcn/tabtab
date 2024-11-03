import PanelWidget from '@/components/panel-widgets';
import { IWidget, IWidgetNode } from '@/typings/widget';
import EventEmitter from 'eventemitter3';
import { GridStack, GridStackNode, GridStackOptions } from 'gridstack';
import { Component, h, onBeforeUnmount, render, shallowRef } from 'vue';
import './index.css';
import './index.scss';

export const defineGridStack = (gridId: string) => {
  const gridStack = shallowRef<GridStack>(null);

  /**
   * 事件
   */
  const gridEvent = new EventEmitter();

  /**
   * 添加插件
   * @param widget
   */
  const addWidget = (...widgets: IWidget[]) => {
    gridEvent.emit('added', widgets);
    widgets.forEach((widget) => {
      gridStack.value?.addWidget(widget);
    });
  };

  /**
   * 获取所有组件
   * @returns
   */
  const widgets = (): IWidget[] => {
    return gridStack.value.save(false) as IWidget[];
  };

  /**
   * 挂载
   * @param el
   */
  const mount = (el: HTMLDivElement, options: GridStackOptions = {}, contentNode: Component = PanelWidget) => {
    gridStack.value = GridStack.init(
      {
        float: true,
        minRow: 10,
        cellHeight: '30px',
        columnOpts: {
          columnWidth: 30,
          columnMax: 64
        },
        ...options
      },
      el
    );
    gridStack.value.on('added', (event, items) => {
      console.log('[panel-grid] added', event, items);
      for (const item of items) {
        const itemEl = item.el;
        const itemElContent = itemEl.querySelector('.grid-stack-item-content');
        const itemContentVNode = h(contentNode, {
          widget: item as IWidgetNode,
          onRemove: () => {
            gridStack.value.removeWidget(itemEl);
          }
        });
        render(itemContentVNode, itemElContent);
      }
    });
    gridStack.value.on('removed', function (event, items) {
      console.log('[panel-grid] removed', event, items);
      gridEvent.emit('removed', items);
      for (const item of items) {
        const itemEl = item.el;
        const itemElContent = itemEl.querySelector('.grid-stack-item-content');
        render(null, itemElContent);
      }
    });

    gridStack.value.on('change', function (event, items) {
      gridEvent.emit('change', items);
    });

    /**
     * 放大监听
     */
    gridStack.value.on('resizestop', function (event, el) {
      el.dispatchEvent(new CustomEvent('widget-resizestop', event));
    });
  };

  /**
   * 加载
   * @param widgets
   * @returns
   */
  const load = (widgets: IWidget[]) => {
    return gridStack.value?.load(widgets, true);
  };

  /**
   * 获取配置
   * @returns
   */
  const config = () => {
    return gridStack.value?.save(false);
  };

  return () => {
    const onAdd = (cb: (nodes: GridStackNode[]) => void) => {
      gridEvent.on('added', cb);
      onBeforeUnmount(() => {
        gridEvent.off('added', cb);
      });
    };

    const onRemove = (cb: (nodes: GridStackNode[]) => void) => {
      gridEvent.on('removed', cb);
      onBeforeUnmount(() => {
        gridEvent.off('removed', cb);
      });
    };

    const onChange = (cb: (nodes: GridStackNode[]) => void) => {
      gridEvent.on('change', cb);
      onBeforeUnmount(() => {
        gridEvent.off('removed', cb);
      });
    };

    return {
      gridId,
      load,
      onAdd,
      onRemove,
      addWidget,
      onChange,
      mount,
      widgets,
      config
    };
  };
};

export const usePanelGrid = defineGridStack('panel');

/**
 * 插件库
 */
export const useStoreGrid = defineGridStack('store');
