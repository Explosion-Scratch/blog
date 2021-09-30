module.exports = (meta) => {
    return [
        {name: "title", content: meta.title},
        {name: "description", content: meta.description },
        {name: "theme-color", content: meta.color},
        {name: "og:type", content: 'website'},
        {name: "og:url", content: meta.url},
        {name: "og:title", content: meta.title},
        {name: "og:image", content: meta.image},
        {name: "twitter:card", content: "summary_large_imgae"},
        {name: "twitter:url", content: meta.url},
        {name: 'twitter:title', content: meta.title},
        {name: "twitter:description", content: meta.description},
        {name: "twitter:image", content: meta.image},
        {name: "author", content: "Explosion-Scratch"}
    ].map(i => {
        var out = {...i}
        if (!out.hid) {
            out.hid = out.name;
        }
        return out;
    })
}