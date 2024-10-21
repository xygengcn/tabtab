import { defineComponent, h, onMounted, ref, render } from 'vue';
import './gridstack.css';
import './index.scss';
import { GridStack } from 'gridstack';
import PanelGridItem from './item';

/**
 * @description 面板网格
 */
const PanelGrid = defineComponent({
  name: 'PanelGrid',
  setup() {
    let grid = null;
    const gridRef = ref<HTMLDivElement>(null);
    onMounted(() => {
      grid = GridStack.init(
        {
          float: true,
          cellHeight: '70px',
          minRow: 10,
          columnOpts: {
            columnWidth: 12,
            columnMax: 24,
            breakpointForWindow: true
          }
        },
        gridRef.value
      );
      grid.on('added', function (event, items) {
        console.log('[panel-grid] added', event, items);
        for (const item of items) {
          const itemEl = item.el;
          const itemElContent = itemEl.querySelector('.grid-stack-item-content');
          const itemId = item.id;
          const itemContentVNode = h(PanelGridItem, {
            itemId: itemId,
            properties: item.properties,
            onRemove: () => {
              grid.removeWidget(itemEl);
            }
          });
          render(itemContentVNode, itemElContent);
        }
      });
      grid.on('removed', function (event, items) {
        console.log('[panel-grid] removed', event, items);
        for (const item of items) {
          const itemEl = item.el;
          const itemElContent = itemEl.querySelector('.grid-stack-item-content');
          render(null, itemElContent);
        }
      });
      grid.addWidget({ w: 25, x: 3, y: 3, properties: {}, content: '' });
    });
    return () => <div class="panel-grid grid-stack" ref={gridRef}></div>;
  }
});

export default PanelGrid;
