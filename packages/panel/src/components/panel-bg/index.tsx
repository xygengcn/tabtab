import { defineComponent } from 'vue';
import './index.scss';
import bg from '@/assets/bg/1.jpg';

const PanelBackground = defineComponent({
  name: 'PanelBackground',
  setup() {
    return () => (
      <div class="panel-background">
        <img src={bg} alt="" />
      </div>
    );
  }
});

export default PanelBackground;
