import { useStoreGrid } from '@/services/gridstack';
import { useWidgetStore } from '@/store/widgets';
import vClickOutside from 'click-outside-vue3';
import { defineComponent, onMounted, ref, Transition } from 'vue';
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
    const widgetStore = useWidgetStore();
    const gridRef = ref<HTMLDivElement>(null);
    const { mount, addWidget } = useStoreGrid();
    onMounted(() => {
      mount(
        gridRef.value,
        {
          removable: false,
          class: 'panel-store-grid',
          itemClass: 'panel-store-grid-item'
        },
        PanelStoreItem
      );
      addWidget(...widgetStore.storeWdigets.map((i) => ({ ...i, noMove: true, noResize: true, locked: true })));
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
