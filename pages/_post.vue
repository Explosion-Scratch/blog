<template>
    <div class="app_container">
        <NuxtContent
        class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
        :document="page"
        />
    </div>
</template>
<script>
export default {
    data(){
        return {page: null};
    },
    async asyncData({ $content }) {
        const page = await $content('hello').fetch()

        return {
        page,
        }
    },
}
</script>