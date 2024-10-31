import { defineComponent } from 'vue';
import PanelGrid from './components/panel-grid';
import PanelBackground from './components/panel-bg';
import PanelMenu from './components/panel-menu';
import '@tabtab/icon/dist/style.css';
import './App.scss';
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
