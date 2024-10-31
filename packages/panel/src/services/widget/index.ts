import ClockWidget from '@/components/panel-widgets/clock';
import { WebsideColumnWidget, WebsideIntroWidget, WebsideRowWidget } from '@/components/panel-widgets/webside';
import { IWidget, IWidgetConfig } from '@/typings/widget';
import { App, h } from 'vue';

/**
 * 插件库处理
 */
export class WidgetStore {
  /**
   * 插件库组件映射
   */
  private static widgetStoreComponentMap: Map<string, IWidgetConfig> = new Map();

  /**
   * 插件库组件列表
   */
  private static widgetStoreList: IWidget[] = [];

  /**
   * 注册插件
   * @param widgetConfig
   */
  static register(widgetConfig: IWidgetConfig) {
    this.widgetStoreComponentMap.set(widgetConfig.type, widgetConfig);
    this.widgetStoreList.push(widgetConfig.default);
  }

  /**
   * 返回渲染
   * @param callback
   * @returns
   */
  static list(): IWidget[] {
    return this.widgetStoreList;
  }

  /**
   * 渲染
   * @param widget
   * @returns
   */
  static render(widget: IWidget) {
    const widgetConfig = this.widgetStoreComponentMap.get(widget.type);
    if (widgetConfig) {
      return h(widgetConfig.component, { widget });
    }
    return null;
  }

  /**
   * 获取组件
   * @param type
   * @returns
   */
  static find(type: string) {
    return this.widgetStoreComponentMap.get(type);
  }

  /**
   * 安装
   * @param app
   */
  static install(app: App) {
    for (const [_key, value] of this.widgetStoreComponentMap) {
      app.component(value.component.name, value.component);
    }
  }
}

// 时钟组件
WidgetStore.register(ClockWidget);

// 网站组件
WidgetStore.register(WebsideIntroWidget);
WidgetStore.register(WebsideRowWidget);
WidgetStore.register(WebsideColumnWidget);

export default WidgetStore;
