import { useWidget } from '@/services/gridstack';
import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import './index.scss';
/**
 * 插件库
 */
const ClockWidget = defineComponent({
  name: 'ClockWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const clock = ref<HTMLDivElement>(null);
    const width = ref(0);
    const { onResizeStop } = useWidget(props.widget);
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

export default ClockWidget;
