import { IWidgetConfig, IWidgetNode } from '@/typings/widget';
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
  setup(props) {
    const handleClickWebside = () => {
      if (props.widget.properties?.url) {
        window.open(props.widget.properties?.url);
      }
    };
    return () => (
      <div class="widget-webside-intro" onClick={handleClickWebside}>
        <div class="widget-webside-intro-logo">
          <img src={props.widget.properties.imgUrl} alt="" />
        </div>
        <div class="widget-webside-intro-content">
          <span class="name">{props.widget.properties.name}</span>
          <span class="intro">{props.widget.properties.intro}</span>
        </div>
      </div>
    );
  }
});

/**
 * 组件配置
 */
const WebsideIntroWidget: IWidgetConfig = {
  type: 'webside-intro',
  component: WebsideIntroWidgetComponent,
  default: {
    id: 'webside-intro-01',
    type: 'webside-intro',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: 'TabTab',
      intro: '这是一个快乐的网站',
      url: 'https://xygeng.cn/'
    },
    w: 8,
    h: 3,
    minW: 5,
    minH: 3,
    maxH: 4
  }
};

export default WebsideIntroWidget;
