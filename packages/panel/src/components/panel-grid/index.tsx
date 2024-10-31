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
    return () => <div class="panel-grid grid-stack" ref={gridRef}></div>;
  }
});

export default PanelGrid;
