import { GridStackNode, GridStackWidget } from 'gridstack';

/**
 * 插件类型
 */
export interface IWidget extends GridStackWidget {
  type: string;
  // 配置
  properties: {};
}

/**
 * 插件节点
 */
export interface IWidgetNode extends GridStackNode {
  type: string;
  // 配置
  properties: {};
}
