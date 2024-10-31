import { IWidgetConfig, IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
/**
 * 网站
 */
const WebsideRowWidgetComponent = defineComponent({
  name: 'WebsideRowWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const handleClickWebside = () => {
      if (props.widget.properties?.url) {
        window.open(props.widget.properties?.url);
      }
    };
    return () => (
      <div class="widget-webside-row" onClick={handleClickWebside}>
        <div class="widget-webside-row-logo">
          <img src={props.widget.properties.imgUrl} alt="" />
        </div>
        <div class="widget-webside-row-name">{props.widget.properties.name}</div>
      </div>
    );
  }
});

/**
 * 组件配置
 */
const WebsideRowWidget: IWidgetConfig = {
  type: 'webside-row',
  component: WebsideRowWidgetComponent,
  default: {
    id: 'webside-row-01',
    type: 'webside-row',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: '稀土掘金',
      url: 'https://xygeng.cn/'
    },
    w: 5,
    h: 2,
    maxH: 2,
    minH: 2,
    minW: 4
  }
};

export default WebsideRowWidget;
