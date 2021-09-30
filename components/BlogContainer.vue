<template>
  <section>
    <div class="p-10 w-full">
      <div :class="classes">
        <BlogPost
          :info="post"
          :key="post.id || post.slug"
          v-for="post in sortedItems"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BlogPost from "./BlogPost.vue";
export default {
  componets: { BlogPost },
  name: "BlogContainer",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    classes: {
      type: String,
      default:
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4",
    },
  },
  computed: {
    sortedItems() {
      var sorted = this.items
        .sort((a, b) => {
          var s = new Date(a.createdAt);
          var e = new Date(b.createdAt);
          return s.getTime() - e.getTime();
        })
        .reverse();
      console.log({ sorted: sorted.map((i) => [i.title, i.createdAt]) });
      return sorted;
    },
  },
};
</script>

<style></style>
