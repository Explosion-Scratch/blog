<template>
    <RecentPosts :posts="posts" :currentPost="posts.slice(-1)[0]"></RecentPosts>
</template>
<script>
export default {
    layout: "home",
    data(){
        return {posts: []}
    },
    async asyncData({$content }) {
		return {
			posts: await $content("/").limit(4).fetch()
		};
	},
}
</script>