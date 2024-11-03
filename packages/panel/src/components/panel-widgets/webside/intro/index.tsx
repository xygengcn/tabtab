import { useWidget } from '@/services/widget/hook';
import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
/**
 * 有简介的网站，
 */
const WebsideIntroWidgetComponent = defineComponent({
  name: 'WebsideIntroWidget',
  props: {
    widget: Object as PropType<IWidgetNode<{ url: string; imgUrl: string; name: string; intro: string }>>
  },
  setup() {
    const { properties } = useWidget();
    const handleClickWebside = () => {
      if (properties.value.url) {
        window.open(properties.value.url);
      }
    };
    return () => (
      <div class="widget-webside-intro" onClick={handleClickWebside}>
        <div class="widget-webside-intro-logo">
          <img src={properties.value.imgUrl} alt="" />
        </div>
        <div class="widget-webside-intro-content">
          <span class="name">{properties.value.name}</span>
          <span class="intro">{properties.value.intro}</span>
        </div>
      </div>
    );
  }
});

export default WebsideIntroWidgetComponent;
