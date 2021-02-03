<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <div style="height: 100%">
        <!-- <div @click="changeLocale">语言切换</div> -->
        <vue-form-render v-model="schema" :locale="locale"></vue-form-render>
      </div>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zh from '../packages/Locale/zh'
import en from '../packages/Locale/en'
// import { use } from '../packages/Locale/index'
export default {
  name: 'App',
  data() {
    return {
      zhCN,
      localeKey: 'zh',
      locale: zh,
      schema: {
        values: {
          key1: '1',
          key2: '2',
        },
        properties: {
          'MTYxMTA0MDY2MTQ2OA==': {
            id: 'MTYxMTA0MDY2MTQ2OA==',
            key: 'key1',
            name: '测试',
            type: 'input',
          },
          'MTYxMTA0MDY3NjE4NA==': {
            id: 'MTYxMTA0MDY3NjE4NA==',
            key: 'key2',
            name: '测试2',
            type: 'input',
          },
        },
        configs: {
          grid: 1,
          labelWidth: 10,
          layout: 'vertical',
          editable: false,
        },
      },
    }
  },
  methods: {
    changeLocale() {
      if (this.localeKey === 'en') {
        this.localeKey = 'zh'
        this.locale = zh
        // use(zh)
      } else {
        this.localeKey = 'en'
        this.locale = en
        // use(en)
      }
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
