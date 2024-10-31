import { IWidgetConfig, IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
/**
 * 网站
 */
const WebsideColumnWidgetComponent = defineComponent({
  name: 'WebsideColumnWidget',
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
      <div class="widget-webside-column" onClick={handleClickWebside}>
        <div class="widget-webside-column-logo">
          <img src={props.widget.properties.imgUrl} alt="" />
        </div>
        <div class="widget-webside-column-name">{props.widget.properties.name}</div>
      </div>
    );
  }
});

/**
 * 组件配置
 */
const WebsideColumnWidget: IWidgetConfig = {
  type: 'webside-column',
  component: WebsideColumnWidgetComponent,
  default: {
    id: 'webside-column-01',
    type: 'webside-column',
    properties: {
      imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/default-favicon.2eb36e10.png',
      name: '稀土掘金',
      url: 'https://xygeng.cn/'
    },
    w: 3,
    h: 3,
    minH: 3,
    minW: 3
  }
};

export default WebsideColumnWidget;
