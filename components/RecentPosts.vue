<template>
    <div class="recentPosts">
        <BlogContainer class="posts w-5/6" :items="posts" />
    </div>
</template>
<script>
export default {
    name: "RecentPosts",
    props: { 
        posts: { type: Array, default: [] }
    }
}
</script>