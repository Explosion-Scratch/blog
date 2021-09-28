<template>
  <section class="text-gray-600">
    <div class="p-10 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
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
