<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <BlogPost :info="post" :key="post.id || post.slug" v-for="post in items" />
      </div>
    </div>
  </section>
</template>

<script>
import BlogPost from "./BlogPost.vue";
export default {
	componets: { BlogPost },
	name: "BlogContainer",
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style></style>
