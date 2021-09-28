<template>
    <RecentPosts :posts="posts"></RecentPosts>
</template>
<script>
export default {
    layout: "home",
    data(){
        return {posts: []}
    },
    async asyncData({$content }) {
		return {
			posts: await $content("/").only(["title", "description", "category", "createdAt", "path"]).limit(4).fetch()
		};
	},
}
</script>