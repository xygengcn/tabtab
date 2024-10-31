import { IWidgetNode } from '@/typings/widget';
import { defineComponent, PropType } from 'vue';
import ClockWidget from './clock';
import './index.scss';
import WebsideRowWidget from './webside/row';
import WebsideColumnWidget from './webside/column';

/**
 * 插件库
 */
const PanelWidget = defineComponent({
  name: 'PanelWidget',
  props: {
    widget: Object as PropType<IWidgetNode>,
    visibleAdd: Boolean,
    visibleDelete: Boolean
  },
  emits: {
    add(widget: IWidgetNode, e: PointerEvent) {},
    delete(widget: IWidgetNode, e: PointerEvent) {}
  },
  setup(props, context) {
    const handleClickAdd = (e: PointerEvent) => {
      context.emit('add', props.widget, e);
    };
    const handleClickDelete = (e: PointerEvent) => {
      context.emit('delete', props.widget, e);
    };
    return () => (
      <div class='panel-widget' data-widget-id={props.widget.id} data-widget-type={props.widget.type}>
        <i class="add" onClick={handleClickAdd} v-show={props.visibleAdd}></i>
        <i class="delete" onClick={handleClickDelete} v-show={props.visibleDelete}></i>
        <div class="panel-widget-wrap">
          {(() => {
            switch (props.widget.type) {
              case 'clock': {
                return <ClockWidget widget={props.widget} />;
              }
              case 'webside-row': {
                return <WebsideRowWidget widget={props.widget} />;
              }
              case 'webside-column': {
                return <WebsideColumnWidget widget={props.widget} />;
              }
              default:
                return <div class="panel-widget-default"></div>;
            }
          })()}
        </div>
      </div>
    );
  }
});

export default PanelWidget;
