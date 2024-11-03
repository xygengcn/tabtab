import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
import { useWidget } from '@/services/widget/hook';
/**
 * 网站
 */
const WebsideColumnWidgetComponent = defineComponent({
  name: 'WebsideColumnWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const { properties } = useWidget();
    const handleClickWebside = () => {
      if (properties.value?.url) {
        window.open(properties.value?.url);
      }
    };
    return () => (
      <div class="widget-webside-column" onClick={handleClickWebside}>
        <div class="widget-webside-column-logo">
          <img src={properties.value.imgUrl} alt="" />
        </div>
        <div class="widget-webside-column-name">{properties.value.name}</div>
      </div>
    );
  }
});

export default WebsideColumnWidgetComponent;
