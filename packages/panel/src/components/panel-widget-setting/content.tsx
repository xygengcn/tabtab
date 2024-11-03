import { Modal, Input, Textarea } from 'ant-design-vue';
import vClickOutside from 'click-outside-vue3';
import { defineComponent, PropType, ref } from 'vue';
import './index.scss';
import { IWidget } from '@/typings/widget';
import { useWidget } from '@/services/widget/hook';
/**
 * 插件库
 */
const PanelWidgetSetting = defineComponent({
  name: 'PanelWidgetSetting',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    widget: {
      type: Object as PropType<IWidget>,
      required: true
    }
  },
  emits: ['close'],
  setup(props, context) {
    const properties = ref(JSON.stringify(props.widget.properties || {}, null, 4));

    const { updateProperties } = useWidget();
    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      context.emit('close');
    };

    const handleChangeProperties = () => {
      try {
        const propertiesValue = JSON.parse(properties.value) || {};
        updateProperties(propertiesValue);
      } catch (e) {
        console.error('[widget] update', e);
      }
    };
    return () => (
      <Modal
        class="panel-widget-setting"
        title={null}
        closable={false}
        open={true}
        destroyOnClose={true}
        onChange={handleClose}
        footer={null}
      >
        <div class="panel-widget-setting-title">
          <span>组件属性</span>
        </div>
        <div class="panel-widget-setting-content">
          <div class="panel-widget-setting-content-item">
            <span class="label">组件ID</span>
            <Input v-model:value={props.widget.id} spellcheck={false} disabled></Input>
          </div>
          <div class="panel-widget-setting-content-item">
            <span class="label">组件类型</span>
            <Input v-model:value={props.widget.type} spellcheck={false} disabled></Input>
          </div>
          <div class="panel-widget-setting-content-item">
            <span class="label">组件自定义</span>
            <Textarea
              v-model:value={properties.value}
              spellcheck={false}
              autoSize={true}
              onBlur={handleChangeProperties}
            ></Textarea>
          </div>
        </div>
      </Modal>
    );
  }
});
export default PanelWidgetSetting;
