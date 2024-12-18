import { usePanelGrid } from '@/services/gridstack';
import { WidgetStore } from '@/services/widget';
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
    const handleClickAddWidget = (w: IWidgetNode) => {
      console.log('[panel-store] add', w);
      const widget = WidgetStore.find(props.widget.type);
      if (widget) {
        /**
         * 添加插件到面板
         */
        const newWidget = { id: `${props.widget.type}-${Date.now()}`, ...widget.default };
        addWidget(newWidget);
      }
    };
    return () => (
      <div class="panel-store-item">
        <PanelWidget
          widget={props.widget}
          onAdd={handleClickAddWidget}
          disabledContextMenu={true}
          visibleAdd={true}
          visibleDelete={false}
          preventDefault={true}
        />
      </div>
    );
  }
});

export default PanelStoreItem;
