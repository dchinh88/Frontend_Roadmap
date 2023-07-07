<template>
  <div>
    <li 
      v-for="move in moves" 
      :key="move.move"
    >
      <button 
        :class="{'highlight': move.move === this.stepNumber}" 
        @click="jumpTo(move.move)"
      >
        {{ move.desc }}
      </button>
    </li>
  </div>
</template>
  
  <script>
export default {
  props: ["history", "stepNumber", "moves"],
  data() {
    return {
    };
  },
  methods: {
    jumpTo(move) {
      this.$emit("jump-to", move);
    },
    isCurrentStep(move) {
      return move === this.stepNumber;
    },
  }
};
</script>

<style scoped>
.highlight {
  font-weight: bold;
}
</style>
  