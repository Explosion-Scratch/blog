<template>
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