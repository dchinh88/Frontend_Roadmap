<template>
  <button 
    class="square" 
    :class="{ 'highlight': highlight }" 
    @click="handleClick"
  >
    {{value}}
  </button>
</template>
  
<script>
export default {
  props: ["value", "highlight"],
  methods: {
    handleClick() {
      //Gửi sự kiện cho Board khi ô được click
      if(!this.value) {
        this.$emit("select")
      }
    }
  }
};
</script>

<style scoped>
.highlight {
  background-color: yellow;
}
</style>