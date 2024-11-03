import { useWidget } from '@/services/widget/hook';
import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import './index.scss';
/**
 * 时钟插件
 */
const ClockWidgetComponent = defineComponent({
  name: 'ClockWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const clock = ref<HTMLDivElement>(null);
    const width = ref(0);
    const { onResizeStop } = useWidget();
    onResizeStop(() => {
      width.value = clock.value.clientWidth;
    });
    onMounted(() => {
      width.value = clock.value.clientWidth;
    });
    return () => (
      <div class={{ 'widget-clock': true }}>
        <div class="widget-clock-content" ref={clock}>
          <thy-clock
            size={width.value}
            dial-color="#121212"
            dial-background-color="#fff"
            second-hand-color="#cc0000"
          ></thy-clock>
        </div>
      </div>
    );
  }
});

export default ClockWidgetComponent;
