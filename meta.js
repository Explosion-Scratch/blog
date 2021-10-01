module.exports = (meta) => {
  return [
    { name: "title", content: meta.title },
    { name: "author", content: "Explosion-Scratch" },
    {
      name: "keywords",
      content: meta.keywords || "blog,coding,javascript,explosion-scratch",
    },
    { name: "robots", content: "index,follow" },
    { name: "language", content: "English" },
    { name: "description", content: meta.description },
    { name: "theme-color", content: meta.color },
    { name: "og:type", content: "website" },
    { name: "apple-mobile-web-app-title", content: meta.title },
    { name: "og_site_name", content: "ByteSite" },
    { name: "og:site_name", content: "ByteSite" },
    { name: "og:locale", content: "en_US" },
    { name: "og:url", content: meta.url },
    { name: "og:title", content: meta.title },
    { name: "og:description", content: meta.description },
    { name: "og:image", content: meta.image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: meta.url },
    { name: "twitter:title", content: meta.title },
    { name: "twitter:description", content: meta.description },
    { name: "twitter:image", content: meta.image },
  ].map((i) => {
    var out = { ...i };
    if (!out.hid) {
      out.hid = out.name;
    }
    return out;
  });
};
