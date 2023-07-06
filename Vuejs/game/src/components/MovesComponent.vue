<template>
  <div>
    <button @click="handleSortToggle()" >
      {{ this.isAscending ? 'descending' : 'ascending' }}
    </button>
    <li v-for="(step, move) in history" :key="move">
      <button 
        @click="jumpTo(move)"
        :class="{highlight: isCurrentStep(move)}"
      >
        {{ getDescription(move, step) }}
      </button>
    </li>
  </div>
</template>
  
  <script>
export default {
  props: ["history", "stepNumber"],
  data() {
    return {
      isAscending: true,
      moves: [],
    }
  },
  methods: {
    getDescription(move, step) {
      if(move === 0) {
        return "Go to game start";
      } 
      if(move > 0 && step.selectedSquare !== null) {
        return `Go to move #${move} (${Math.floor(step.selectedSquare / 10 + 1)}-${step.selectedSquare % 10 + 1})`;
      }
    },
    jumpTo(move) {
      this.$emit("jump-to", move);
    },
    isCurrentStep(move) {
      return move === this.stepNumber;
    },
    handleSortToggle() {
      this.isAscending = !this.isAscending;
      console.log(this.moves);
      this.moves.reverse()
    }
  }
};
</script>

<style scoped>
.highlight{
  font-weight: bold;
}
</style>
  