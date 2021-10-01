<template>
  <div class="callout">
    <span class="emoji">{{ emoji }}</span>
    <span class="text inline-flex justify-center items-center"
      ><slot></slot
    ></span>
  </div>
</template>

<script>
export default {
  name: "Callout",
  props: {
    emoji: { type: String, default: "💡" },
  },
};
</script>

<style scoped lang="scss">
@import "../static/css/base";

.callout {
  background: rgba($base-color, 0.2);
  display: flex;
  padding: 10px;
  width: 100%;
  color: lighten($base-color, 30);
  border-radius: 5px;
  .emoji {
    font-size: 1.4rem;
    padding-right: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
