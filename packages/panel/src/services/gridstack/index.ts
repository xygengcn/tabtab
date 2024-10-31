import PanelWidget from '@/components/panel-widgets';
import { IWidget, IWidgetNode } from '@/typings/widget';
import { GridItemHTMLElement, GridStack, GridStackOptions } from 'gridstack';
import { Component, h, ref, render, shallowRef } from 'vue';
import './index.css';
import './index.scss';

export const defineGridStack = () => {
  const gridStack = shallowRef<GridStack>(null);
  const widgetList = ref<IWidget[]>([]);

  /**
   * 添加插件
   * @param widget
   */
  const addWidget = (...widgets: IWidget[]) => {
    widgetList.value.push(...widgets);
    widgets.forEach((widget) => {
      gridStack.value?.addWidget(widget);
    });
  };

  /**
   * 获取所有组件
   * @returns
   */
  const widgets = (): IWidget[] => {
    return gridStack.value.getGridItems() as any;
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
      for (const item of items) {
        const itemEl = item.el;
        const itemElContent = itemEl.querySelector('.grid-stack-item-content');
        render(null, itemElContent);
      }
    });
  };

  return () => {
    return {
      addWidget,
      mount,
      widgets
    };
  };
};

/**
 * 插件hook
 * @param widget
 * @returns
 */
export const useWidget = (widget: IWidgetNode) => {
  /**
   *
   * 监听变形结束
   * @todo 需要移除监听
   * @param callback
   */
  const onResizeStop = (callback: (el: GridItemHTMLElement) => void) => {
    widget.grid.on('resizestop', (event: Event, el: GridItemHTMLElement) => {
      if (el.gridstackNode?.id === widget.id) {
        callback(el);
      }
    });
  };

  return {
    onResizeStop
  };
};

export const usePanelGrid = defineGridStack();

/**
 * 插件库
 */
export const useStoreGrid = defineGridStack();
