import { defineComponent } from 'vue';
import './index.scss';

const PanelBackground = defineComponent({
  name: 'PanelBackground',
  setup() {
    return () => <div class="panel-background"></div>;
  }
});

export default PanelBackground;
