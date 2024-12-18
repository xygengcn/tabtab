import '@tabtab/icon/dist/style.css';
import { defineComponent } from 'vue';
import './App.scss';
import PanelBackground from './components/panel-bg';
import PanelGrid from './components/panel-grid';
import PanelMenu from './components/panel-menu';
const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="app">
        <PanelGrid></PanelGrid>
        <PanelBackground></PanelBackground>
        <PanelMenu></PanelMenu>
      </div>
    );
  }
});

export default App;
