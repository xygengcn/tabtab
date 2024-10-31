import { defineComponent } from 'vue';

import './app.scss';
import Icon from './icon';
const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="app">
        <h1>TabTab图标库</h1>
        <div class="app-list">
          <Icon type="add" size={40}></Icon>
          <Icon type="delete" size={40}></Icon>
          <Icon type="store" size={40}></Icon>
        </div>
      </div>
    );
  }
});

export default App;
