import { useWidgetStore } from '@/store/widgets';
import { IWidgetNode } from '@/typings/widget';
import vClickOutside from 'click-outside-vue3';
import { GridStack } from 'gridstack';
import { defineComponent, h, onMounted, ref, render, Transition } from 'vue';
import PanelStoreItem from './item';
/**
 * 插件库
 */
const PanelStore = defineComponent({
  name: 'PanelStore',
  directives: {
    clickOutside: vClickOutside.directive
  },
  emits: ['close'],
  setup(props, context) {
    const store = useWidgetStore();
    let grid: GridStack = null;
    const gridRef = ref<HTMLDivElement>(null);
    onMounted(() => {
      grid = GridStack.init(
        {
          float: true,
          removable: false,
          class: 'panel-store-grid',
          itemClass: 'panel-store-grid-item',
          columnOpts: {
            columnWidth: 12,
            columnMax: 12,
            breakpointForWindow: true
          }
        },
        gridRef.value
      );
      grid.on('added', (event, items) => {
        for (const item of items) {
          const itemEl = item.el;
          const itemElContent = itemEl.querySelector('.grid-stack-item-content');
          const itemContentVNode = h(PanelStoreItem, {
            widget: item as IWidgetNode,
            onRemove: () => {
              grid.removeWidget(itemEl);
            }
          });
          render(itemContentVNode, itemElContent);
        }
      });
      store.store.forEach((item) => {
        grid.addWidget({ ...item, locked: true, noResize: true, noMove: true });
      });
    });

    /**
     * 关闭
     */
    const handleClickoutside = () => {
      console.log('[panel-store] close');
      context.emit('close');
    };
    return () => (
      <Transition name="slide-fade">
        <div class={{ 'panel-store': true }} v-clickOutside={handleClickoutside}>
          <div class="panel-store-list" ref={gridRef}></div>
        </div>
      </Transition>
    );
  }
});
export default PanelStore;
