import { defineComponent, PropType } from 'vue';
import './index.scss';

export type IconType = 'add' | 'delete' | 'store';

const Icon = defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String as PropType<IconType>,
      required: true,
      default: ''
    },
    size: {
      type: Number,
      required: false,
      default: 16
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <i
        class={['icon', 'iconfont', `icon-${props.type}`]}
        style={{ fontSize: props.size + 'px' }}
        onClick={(e) => {
          emit('click', e);
        }}
      />
    );
  }
});

export default Icon;
