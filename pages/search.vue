<template>
  <div class="search flex justify-center items-center flex-col">
    <div class="search mt-20">
      <StyledInput
        style="width: 600px"
        placeholder="Search all posts"
        v-model="query"
        type="search"
        autocomplete="off"
      />
    </div>
    <div v-if="articles.length" class="h-[70vh] px-4 mt-5 overflow-y-scroll">
      <transition-group name="list" tag="ul">
        <li v-for="article in articles" :key="article.slug">
          <h2>{{ article.title }}</h2>
          <span class="article-description">{{ article.description }}</span>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      articles: [],
    };
  },
  watch: {
    query(val) {
      this.search(val);
    },
  },
  methods: {
    async search(query) {
      if (!query) {
        this.articles = [];
        return;
      }

      this.articles = await this.$content("/")
        .only(["title", "slug", "description", "path", "category"])
        .sortBy("createdAt", "asc")
        .limit(12)
        .search(query)
        .fetch();
    },
  },
};

// TODO: make scroll shadows
function checkOverflow(el) {
  var curOverflow = el.style.overflow;

  if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";

  var isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = curOverflow;

  return isOverflowing;
}
</script>
<style lang="scss" scoped>
@import "../static/css/base";

.items > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  > * {
    display: inline-block;
  }
}
ul {
  width: calc(600px + 20px);
}

li {
  margin-top: 10px;
  border-radius: 5px;
  width: 100%;
  padding: 20px 40px;
  list-style: none;
  font-family: sans-serif;
  background: rgba($base-color, 0.2);
  color: lighten($base-color, 40);
  $s: saturate($base-color, 30);
  font-size: 1rem;
  transition: all 0.3s ease;
  h2 {
    font-size: 1.3rem;
    @include gradient-text(
      to right,
      lighten($s, 30),
      lighten(adjust-hue($s, 70), 30)
    );
  }
  &:hover {
    box-shadow: 0 0 0 4px rgba($s, 0.1);
  }
}

$transition: list;

.#{$transition}-item {
  display: inline-block;
}
.#{$transition}-enter-active,
.#{$transition}-leave-active {
  transition: all 1s;
}
.#{$transition}-enter, .#{$transition}-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(200px);
}
</style>
