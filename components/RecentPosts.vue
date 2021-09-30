<template>
    <div class="recentPosts w-full">
        <div class="buttons w-full px-[50px] flex mb-10 justify-between">
            <RippleButton class="nextPost inline-flex items-center justify-center flex-row">
                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M11 5l-7 7l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                <template v-if="nextPost">
                    <NuxtLink :to="nextPost.path">{{slice(nextPost.title, 30)}}</NuxtLink>
                </template>
                <template v-else>
                    <span class="err">No post after this 🤷!</span>
                </template>
            </RippleButton>
            <RippleButton class="previousPost inline-flex items-center justify-center flex-row-reverse">
                <svg class="ml-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 5l7 7l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                <template v-if="previousPost">
                    <NuxtLink :to="previousPost.path">{{slice(previousPost.title, 30)}}</NuxtLink>
                </template>
                <template v-else>
                    <span class="err">🎉 This is the first post!</span>
                </template>
            </RippleButton>
        </div>
        <h2>Recent posts</h2>
        <BlogContainer class="posts w-full" :items="posts" classes="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"/>
    </div>
</template>
<script>
export default {
    name: "RecentPosts",
    props: { 
        posts: { type: Array, default: [], },
        currentPost: {type: Object, default: {} },
    },
    data(){ 
        return {
            p: []
        }; 
    },
    mounted(){
        // item 0 is newest
        var sorted = this.posts.sort((a,b)=>{
				var s = new Date(a.createdAt);
				var e = new Date(b.createdAt);
				return s.getTime()-e.getTime();
			});
            console.log({sorted})
        this.p = sorted;
    },
    updated(){
        if (!process.browser) return;
        if (this.$el.querySelector(".err")){
            [...this.$el.querySelectorAll(".err")].forEach(span => span.parentElement.setAttribute("disabled", "disabled"));
        }
    },
    methods: { 
        slice(text, chars){
            return text.length >= (chars - 3) ? `${text.slice(0, chars-3)}...` : text;
        },
        idx(i, arr){
            return {front: arr[i + 1], behind: arr[i - 1]}
        }
    },
    computed: {
        postIndex(){
            try {
                return this.p.findIndex((i) => this.currentPost.path === i.path) ;
            } catch(e) {
                console.error("Error:", e);
            }
        },
        previousPost(){
            return this.idx(this.postIndex, this.p).front;
        },
        nextPost(){
            return this.idx(this.postIndex, this.p).behind;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../static/css/base";

h2 {
    color: lighten($background, 30);
    font-size: clamp(2rem, 2.5vw, 5rem);
    font-weight: 900;
    padding-left: 50px;
}
</style>
