import { WidgetStore } from '@/services/widget';
import { IWidgetNode } from '@/typings/widget';
import { Icon } from '@tabtab/icon';
import { defineComponent, PropType } from 'vue';
import './index.scss';
import VueContextMenu from '@/directive/contextmenu';
import showPanelWidgetSetting from '../panel-widget-setting';

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
    preventDefault: Boolean,
    /**
     * 禁用右键菜单
     */
    disabledContextMenu: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    contextmenu: VueContextMenu.directive
  },
  emits: {
    add: (widget: IWidgetNode<Record<string, any>>) => null,
    delete: (widget: IWidgetNode<Record<string, any>>) => null
  },
  setup(props, context) {
    const handleClickAdd = (e: PointerEvent) => {
      context.emit('add', props.widget);
    };
    const handleClickDelete = (e: PointerEvent) => {
      props.widget.grid.removeWidget(props.widget.el);
      context.emit('delete', props.widget);
    };

    /**
     * 右键事件
     */
    const handleContextmenu = (options) => {
      console.log('[widget] contextmenu', options);
      switch (options.menuKey) {
        case 'remove': {
          console.log('[widget] remove');
          props.widget.grid.removeWidget(props.widget.el);
          break;
        }
        case 'setting': {
          showPanelWidgetSetting(props.widget);
          break;
        }
      }
    };

    return () => (
      <div
        class="panel-widget"
        data-widget-id={props.widget.id}
        data-widget-type={props.widget.type}
        data-contextMenuKey={props.widget.id}
        v-contextmenu={{
          disabled: props.disabledContextMenu,
          menuList: [
            { label: '移除此小组件', value: 'remove' },
            { label: '属性', value: 'setting' }
          ],
          onSelect: handleContextmenu
        }}
      >
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
