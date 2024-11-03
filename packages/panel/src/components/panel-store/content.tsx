import { useStoreGrid } from '@/services/gridstack';
import { WidgetStore } from '@/services/widget';
import vClickOutside from 'click-outside-vue3';
import { defineComponent, onMounted, ref, Transition } from 'vue';
import PanelStoreItem from './widget';
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
    const gridRef = ref<HTMLDivElement>(null);
    const { mount, load, gridId } = useStoreGrid();
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
      load(WidgetStore.list().map((i) => ({ ...i, noMove: true, noResize: true, locked: true })));
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
        <div class={{ 'panel-store': true }} v-clickOutside={handleClickoutside} data-gridId={gridId}>
          <div class="panel-store-list" ref={gridRef}></div>
        </div>
      </Transition>
    );
  }
});
export default PanelStore;
