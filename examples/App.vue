<template>
  <div id="app">
    <vue-form-render v-model="schema"></vue-form-render>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
