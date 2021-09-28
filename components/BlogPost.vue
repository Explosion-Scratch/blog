<template>
  <div class="post_container p-2">
    <div
      class="
        h-full
        px-8
        py-10
        w-full
        rounded-lg
        overflow-hidden
        text-center
        relative
      "
    >
      <h1 class="title sm:text-2xl text-xl font-medium mb-3">
        {{ info.title }}
      </h1>
      <h2
        class="
          categories
          text-sm
          font-medium
          mb-1
        "
      >
        <span class="category" v-for="i in info.category.split(',')" :key="i">
        {{i.trim()}}
        </span>
      </h2>
      <p class="leading-relaxed my-3 block" style="min-height: 80px;">
        {{ info.description }}
      </p>
      <NuxtLink :to="log(info.path)"><RippleButton class="inline-flex mt-1 items-center justify-center">
        View
        <svg
          class="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </RippleButton>
      </NuxtLink>
      <!-- Comment stats and stuff -->
      <!-- <div
        class="
          text-center
          mt-2
          leading-none
          flex
          justify-center
          absolute
          bottom-0
          left-0
          w-full
          py-4
        "
      >
        <span
          class="
            text-gray-400
            mr-3
            inline-flex
            items-center
            leading-none
            text-sm
            pr-3
            py-1
            border-r-2 border-gray-200
          "
        >
          <svg
            class="w-4 h-4 mr-1"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle></svg
          >1.2K
        </span>
        <span
          class="text-gray-400 inline-flex items-center leading-none text-sm"
        >
          <svg
            class="w-4 h-4 mr-1"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
            ></path></svg
          >6
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
	name: "BlogPost",
	props: {
		info: { type: Object, default: () => ({}) },
	},
  methods: { 
    log(path){
      console.log(path);
      return path;
    },
  }
};
</script>

<style scoped lang="scss">
  @import "../static/css/base";
  .post_container {
    .title {
      color: darken($base-color, 20);
      .dark & {
        color: lighten($base-color, 20)
      }
    }
    &:hover {
      box-shadow: 0 0 0 3px rgba($base-color, .1), 0 0 0 6px adjust-hue(rgba($base-color, .1), 10), 0 0 0 11px adjust-hue(rgba($base-color, .1), 20);
    }
    transition: box-shadow .3s ease;
    cursor: pointer;
    background: rgba($base-color, .1);
    border-radius: 10px;
    color: darken($base-color, 20);
    .dark & {
      color: lighten($base-color, 20)
    }
    .category {
      background: rgba($base-color, .3);
      border-radius: 3px;
      padding: 3px;
      color: darken($base-color, 20);
      margin: 0 3px;
      .dark & {
        color: lighten($base-color, 20)
      }
    }
  }
</style>
