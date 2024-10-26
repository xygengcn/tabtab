import PanelWidget from '@/components/panel-widgets';
import { IWidget, IWidgetNode } from '@/typings/widget';
import { GridItemHTMLElement, GridStack } from 'gridstack';
import { h, ref, render, shallowRef } from 'vue';

export const defineGridStack = () => {
  const gridStack = shallowRef<GridStack>(null);
  const widgetList = ref<IWidget[]>([]);

  /**
   * 添加插件
   * @param widget
   */
  const addWidget = (widget: IWidget) => {
    widgetList.value.push(widget);
    gridStack.value?.addWidget(widget);
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
  const mount = (el: HTMLDivElement) => {
    gridStack.value = GridStack.init(
      {
        float: true,
        cellHeight: 'auto',
        minRow: 10,
        columnOpts: {
          columnWidth: 12,
          columnMax: 24,
          breakpointForWindow: true
        }
      },
      el
    );
    gridStack.value.on('added', (event, items) => {
      console.log('[panel-grid] added', event, items);
      for (const item of items) {
        const itemEl = item.el;
        const itemElContent = itemEl.querySelector('.grid-stack-item-content');
        const itemContentVNode = h(PanelWidget, {
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
    widgetList.value.forEach((widget) => {
      gridStack.value.addWidget(widget);
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
