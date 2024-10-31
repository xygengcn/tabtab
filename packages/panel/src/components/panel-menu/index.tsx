import { defineComponent } from 'vue';
import './index.scss';
import showPanelStore from '../panel-store';
import { Icon } from '@tabtab/icon';

/**
 * 首页菜单
 */
const PanelMenu = defineComponent({
  name: 'PanelMenu',
  setup() {
    return () => (
      <div class="panel-menu">
        <div class="panel-menu-store" onClick={showPanelStore}>
          <Icon type="store" size={32}></Icon>
        </div>
      </div>
    );
  }
});

export default PanelMenu;
