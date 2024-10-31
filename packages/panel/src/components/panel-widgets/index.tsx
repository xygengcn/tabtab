import WidgetStore from '@/services/widget';
import { IWidgetNode } from '@/typings/widget';
import { Icon } from '@tabtab/icon';
import { defineComponent, PropType } from 'vue';
import './index.scss';

/**
 * 插件库
 */
const PanelWidget = defineComponent({
  name: 'PanelWidget',
  props: {
    /**
     * 组件数据
     */
    widget: Object as PropType<IWidgetNode>,
    /**
     * 添加按钮
     */
    visibleAdd: {
      type: Boolean,
      default: false
    },
    /**
     * 移除
     */
    visibleDelete: {
      type: Boolean,
      default: false
    },
    preventDefault: Boolean
  },
  emits: {
    add: (widget: IWidgetNode, e: PointerEvent) => null,
    delete: (widget: IWidgetNode, e: PointerEvent) => null
  },
  setup(props, context) {
    const handleClickAdd = (e: PointerEvent) => {
      context.emit('add', props.widget, e);
    };
    const handleClickDelete = (e: PointerEvent) => {
      props.widget.grid.removeWidget(props.widget.el);
      context.emit('delete', props.widget, e);
    };

    return () => (
      <div class="panel-widget" data-widget-id={props.widget.id} data-widget-type={props.widget.type}>
        {props.visibleAdd && <Icon type="add" onClick={handleClickAdd} size={18}></Icon>}
        {props.visibleDelete && <Icon type="delete" onClick={handleClickDelete} size={18}></Icon>}
        <div class={{ 'panel-widget-wrap': true, 'prevent-default': props.preventDefault }}>
          {WidgetStore.render(props.widget)}
        </div>
      </div>
    );
  }
});

export default PanelWidget;
