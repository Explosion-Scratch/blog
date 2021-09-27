<template>
  <div class="callout"><slot></slot></div>
</template>

<script>
export default {
    name: "Callout"
}
</script>

<style scoped lang="scss">
@import "../static/css/base";

.callout {
    background: rgba($base-color, .1);
    padding: 10px;
    border-radius: 3px;
}
</style>