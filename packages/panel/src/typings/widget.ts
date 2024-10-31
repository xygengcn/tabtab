import { GridStackNode, GridStackWidget } from 'gridstack';
import { Component } from 'vue';

/**
 * 插件类型
 */
export interface IWidget<T = Record<string, any>> extends GridStackWidget {
  type: string;
  // 配置
  properties: T;
}

/**
 * 插件节点
 */
export interface IWidgetNode<T = Record<string, any>> extends IWidget<T>, GridStackNode {}

/**
 * 插件配置
 */
export interface IWidgetConfig {
  type: string;
  component: Component;
  default: IWidget;
}
