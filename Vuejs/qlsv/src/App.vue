<template>
  <div>
    <qlsvComponent />
  </div>
</template>

<script>

import qlsvComponent from './components/qlsvComponent.vue';

export default {
  name: "App",
  components: {
    qlsvComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 800px;
  /* text-align: center;
  color: #2c3e50; */
  margin: auto;
  margin-top: 60px;
}
</style>
