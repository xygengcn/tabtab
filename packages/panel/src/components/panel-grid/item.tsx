import 'gridstack/dist/gridstack.min.css';
import { defineComponent, ref } from 'vue';
import './index.scss';

/**
 * @description 面板网格
 */
const PanelGridItem = defineComponent({
  name: 'PanelGridItem',
  props: {
    itemId: String,
    properties: Object
  },
  setup(props) {
    console.log(1111, props.properties);
    const root = ref(null);
    return {
      root
    };
  },
  render() {
    return (
      <div class="panel-grid-item" ref="root">
        xxxxx
      </div>
    );
  }
});

export default PanelGridItem;
