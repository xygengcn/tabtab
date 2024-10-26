import { IWidgetNode } from '@/typings/widget';
import { defineComponent, PropType } from 'vue';
import ClockWidget from './clock';
import './index.scss';

/**
 * 插件库
 */
const PanelWidget = defineComponent({
  name: 'PanelWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    return () => (
      <div class={{ 'panel-widget': true }} data-widget-id={props.widget.id} data-widget-type={props.widget.type}>
        {(() => {
          switch (props.widget.type) {
            case 'clock': {
              return <ClockWidget widget={props.widget} />;
            }
            default:
              return <div class="panel-widget-default"></div>;
          }
        })()}
      </div>
    );
  }
});

export default PanelWidget;
