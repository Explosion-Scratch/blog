<template>
  <div class="app_container">
    <BlogContainer :items="posts" />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import BlogContainer from "../components/BlogContainer.vue";

export default {
	componets: { BlogContainer, AppHeader },
	async asyncData({ $content }) {
		const page = await $content("hello").fetch();

		return {
			page,
		};
	},
	async asyncData({$content }) {
		return {
			page: null,
			posts: await $content("/").only(["title", "description", "category"]).fetch()
		};
	},
};
</script>
<style lang="scss">
code::before,
code::after {
  display: none;
}
code {
  background: #0001;
  padding: 2px 4px;
  border-radius: 2px;
}
</style>
