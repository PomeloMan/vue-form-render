<template>
  <div class="vfr-form-toolbar">
    <template v-for="(group, index) in menus">
      <div :key="'group_' + index" class="anticon-group">
        <template v-for="menu in group">
          <span
            :key="menu.key"
            class="menu"
            :class="{ active: menu.active }"
            @click="menu.handler && menu.handler()"
          >
            <a-icon :type="menu.icon" />
          </span>
        </template>
      </div>
      <a-divider
        :key="'divider_' + index"
        type="vertical"
        style="height: 100%"
        v-if="index != menus.length - 1"
      ></a-divider>
    </template>
  </div>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import Divider from 'ant-design-vue/lib/divider'

export default {
  name: 'vfr-form-toolbar',
  components: {
    AIcon: Icon,
    ADivider: Divider,
  },
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../style.less';
.vfr-form-toolbar {
  display: flex;
  padding: 0 6px;
  flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid @border-color-base;
  .anticon-group {
    display: flex;
    .menu {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 16px;
      &.active,
      &:hover {
        background-color: @gray-3;
      }
      &:active {
        background-color: @gray-4;
      }
    }
  }
}
</style>