import { IWidgetNode } from '@/typings/widget';
import 'thy-clock';
import { defineComponent, PropType } from 'vue';
import './index.scss';
/**
 * 网站
 */
const WebsideColumnWidget = defineComponent({
  name: 'WebsideColumnWidget',
  props: {
    widget: Object as PropType<IWidgetNode>
  },
  setup(props) {
    const handleClickWebside =()=>{
      if(props.widget.properties?.url){
        window.open(props.widget.properties?.url)
      }
    }
    return () => (
      <div class='widget-webside-column' onClick={handleClickWebside}>
        <div class="widget-webside-column-logo">
            <img src={props.widget.properties.imgUrl} alt="" />
        </div>
        <div class="widget-webside-column-name">{props.widget.properties.name}</div>
      </div>
    );
  }
});

export default WebsideColumnWidget;
