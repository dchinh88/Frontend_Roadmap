<template>
  <div>
    <div class="board" >
      <SquareComponent
        v-for="(square, index) in squares"
        :key="index"
        :value="square"
        :highlight="winningSquares.includes(index)"
        @select="handleSelect(index)"
      ></SquareComponent>
    </div>
  </div>
</template>
  
<script>
import SquareComponent from "./SquareComponent.vue";
export default {
  components: {
    SquareComponent
  },
  props: ["squares", "winningSquares"],
  methods: {
    //Gửi sự kiện cho Game khi ô được clic
    handleSelect(index) {
      this.$emit("select", index);
    }
  },
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  margin-bottom: 10px;
}
</style>