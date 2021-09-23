<template>
    <div class="dark-mode">
        <AppHeader />
        <div class="app_container">
            <NuxtContent
            class="prose dark:prose-light prose-sm max-w-xl w-5/6 sm:prose lg:prose-lg xl:prose-xl mx-auto"
            :document="page"
            />
        </div>
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