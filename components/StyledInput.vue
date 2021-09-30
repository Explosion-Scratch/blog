<template>
  <input
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<style lang="scss" scoped>
@import "../static/css/base";

input {
  background: transparent;
  border: 1px solid $base-color;
  padding: 15px 25px;
  border-radius: 100px;
  color: lighten($base-color, 30);
  caret-color: $base-color;
  transition: all 0.3s ease;
  &::-webkit-search-cancel-button {
    display: none;
  }
  &::placeholder {
    color: rgba(lighten($base-color, 20), 0.4);
  }
  &:hover,
  &:focus-within {
    background: rgba($base-color, 0.3);
  }
  &:focus-within {
    box-shadow: 0 0 0 10px rgba(adjust-hue($base-color, 30), 0.05);
  }
  &:hover {
    box-shadow: 0 0 0 5px rgba($base-color, 0.1);
  }
  &:hover:focus-within {
    box-shadow: 0 0 0 5px rgba($base-color, 0.1),
      0 0 0 10px rgba(adjust-hue($base-color, 30), 0.05);
  }
}
</style>
