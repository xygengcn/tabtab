import { IWidget, IWidgetNode } from '@/typings/widget';
import { GridItemHTMLElement } from 'gridstack';
import { getCurrentInstance, onBeforeUnmount, ref } from 'vue';

/**
 * 插件hook
 * @param widget
 * @returns
 */
export const useWidget = () => {
  const instance = getCurrentInstance();

  /**
   * 属性
   */
  const widget: IWidgetNode = instance.props?.widget as IWidgetNode;

  /**
   * 属性
   */
  const properties = ref(widget.properties);

  /**
   * 监听组件变化
   */
  let resizeStopCallback: (e: Event) => void;
  let updateCallback: (e: Event) => void;
  /**
   *
   * 监听变形结束
   * @todo 需要移除监听
   * @param callback
   */
  const onResizeStop = (callback: (el: GridItemHTMLElement) => void) => {
    widget?.el?.addEventListener(
      'widget-resizestop',
      (resizeStopCallback = (e) => {
        callback(widget.el);
      })
    );
  };

  /**
   * 移除组件
   */
  const remove = () => {
    widget.grid.removeWidget(widget.el);
  };

  /**
   * 更新属性
   * @param properties
   */
  const updateProperties = (properties: IWidget['properties']) => {
    widget.grid.update(widget.el, { properties } as IWidget);
    widget?.el.dispatchEvent(new CustomEvent('widget-updateProperties', { detail: widget }));
  };

  /**
   * 监听属性变化
   */
  widget?.el.addEventListener(
    'widget-updateProperties',
    (updateCallback = (e: Event) => {
      const widgetDetail = (e as CustomEvent).detail;
      properties.value = widgetDetail.properties;
    })
  );

  /**
   * 移除事件
   */
  onBeforeUnmount(() => {
    resizeStopCallback && widget?.el.removeEventListener('widget-resizestop', resizeStopCallback);
    updateCallback && widget?.el.removeEventListener('widget-update', updateCallback);
  });

  return {
    properties,
    onResizeStop,
    updateProperties,
    remove
  };
};
