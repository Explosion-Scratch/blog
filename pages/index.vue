<template>
  <div class="app_container">
    <AppHeader />
    <BlogContainer :items="posts" />
    <NuxtContent
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
      :document="page"
    />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import BlogContainer from '../components/BlogContainer.vue'

export default {
  componets: { BlogContainer, AppHeader },
  async asyncData({ $content }) {
    const page = await $content('hello').fetch()

    return {
      page,
    }
  },
  data() {
    return {
      page: null,
      posts: [
        {
          id: 'hello',
          title: 'Hello world',
          description: 'Why the whole world should love my blog',
          category: 'amazingnes',
        },
      ],
    }
  },
}
</script>
<style>
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
