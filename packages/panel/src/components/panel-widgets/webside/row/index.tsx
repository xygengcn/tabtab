import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
import { useWidget } from '@/services/widget/hook';
/**
 * 网站
 */
const WebsideRowWidgetComponent = defineComponent({
  name: 'WebsideRowWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup() {
    const { properties } = useWidget();
    const handleClickWebside = () => {
      if (properties.value.url) {
        window.open(properties.value.url);
      }
    };
    return () => (
      <div class="widget-webside-row" onClick={handleClickWebside}>
        <div class="widget-webside-row-logo">
          <img src={properties.value.imgUrl} alt="" />
        </div>
        <div class="widget-webside-row-name">{properties.value.name}</div>
      </div>
    );
  }
});

export default WebsideRowWidgetComponent;
