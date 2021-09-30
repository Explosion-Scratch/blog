<template>
  <div class="search flex justify-center items-center flex-col">
    <StyledInput placeholder="Search all posts" v-model="query" type="search" autocomplete="off" />
    <div class="items w-5/6 max-w-[600px]">
        <transition-group name="list" tag="div">
            <BlogPost v-for="article in articles" :info="article" :key="article.slug" />
        </transition-group>  
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      articles: []
    }
  },
  methods: {
    async search (query) {
      if (!query) {
        this.articles = []
        return
      }

      this.articles = await this.$content('/')
        .only(['title', 'slug', 'description', 'path', 'category'])
        .sortBy('createdAt', 'asc')
        .limit(12)
        .search(query)
        .fetch()
    }
  }
}
</script>
<style lang="scss" scoped>

.items > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    > * {
        display: inline-block;
    }
}
$transition: list;

.#{$transition}-item {
  display: inline-block;
}
.#{$transition}-enter-active, .#{$transition}-leave-active {
  transition: all 1s;
}
.#{$transition}-enter, .#{$transition}-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(200px);
}
</style>