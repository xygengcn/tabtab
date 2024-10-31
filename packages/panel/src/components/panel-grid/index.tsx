import { usePanelGrid } from '@/services/gridstack';
import { defineComponent, onMounted, ref } from 'vue';
import './index.scss';

/**
 * @description 面板网格
 */
const PanelGrid = defineComponent({
  name: 'PanelGrid',
  setup() {
    const gridRef = ref<HTMLDivElement>(null);
    const { mount } = usePanelGrid();
    onMounted(() => {
      mount(gridRef.value);
    });
    return () => (
      <div class="panel-grid">
        <div class="panel-grid-wrap" ref={gridRef}></div>
      </div>
    );
  }
});

export default PanelGrid;
