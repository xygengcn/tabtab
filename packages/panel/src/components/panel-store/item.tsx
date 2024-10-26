import { usePanelGrid } from '@/services/gridstack';
import { IWidgetNode } from '@/typings/widget';
import { defineComponent, PropType } from 'vue';
import PanelWidget from '../panel-widgets';
import './index.scss';

/**
 * 插件库
 */
const PanelStoreItem = defineComponent({
  name: 'PanelStoreItem',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const { addWidget } = usePanelGrid();
    const handleClickAddWidget = () => {
      console.log('[panel-store] add', props.widget);
      /**
       * 添加插件到面板
       */
      addWidget({
        id: `${props.widget.type}-${Date.now()}`,
        w: props.widget.w,
        h: props.widget.h,
        type: props.widget.type,
        properties: props.widget.properties
      });
    };
    return () => (
      <div class="panel-store-item">
        <i class="add" onClick={handleClickAddWidget}></i>
        <PanelWidget widget={props.widget} />
      </div>
    );
  }
});

export default PanelStoreItem;
