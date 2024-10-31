import { usePanelGrid } from '@/services/gridstack';
import { IWidgetNode } from '@/typings/widget';
import { defineComponent, PropType } from 'vue';
import PanelWidget from '../panel-widgets';
import './index.scss';
import { useWidgetStore } from '@/store/widgets';

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
    const store = useWidgetStore();
    const handleClickAddWidget = () => {
      console.log('[panel-store] add', props.widget);
      const widget = store.storeWdigets.find((i) => i.id === props.widget.id);
      if (widget) {
        /**
         * 添加插件到面板
         */
        addWidget({
          id: `${props.widget.type}-${Date.now()}`,
          ...widget
        });
      }
    };
    return () => (
      <div class="panel-store-item">
        <PanelWidget widget={props.widget} onAdd={handleClickAddWidget} visibleAdd />
      </div>
    );
  }
});

export default PanelStoreItem;
