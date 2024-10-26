import { defineComponent } from 'vue';
import './index.scss';
import showPanelStore from '../panel-store';

/**
 * 首页菜单
 */
const PanelMenu = defineComponent({
  name: 'PanelMenu',
  setup() {
    return () => (
      <div class="panel-menu">
        <div class="panel-menu-setting" onClick={showPanelStore}>
          <i></i>
        </div>
      </div>
    );
  }
});

export default PanelMenu;
