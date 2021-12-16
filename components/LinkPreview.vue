<template>
    <div class="link_preview">
        <template v-if="title && link">
                <div class='img' v-if="img">
                    <img class="!m-0" :src="img" @error="handleError($event.target)"/>	
                </div>
            <div class="right">
                <h3>
                    <img class="inline !m-0" :src="`https://www.google.com/s2/favicons?domain=${host(link)}`"/> {{slice(title, 6)}}
                </h3>
                <div class="description">
                    {{description ? slice(description, 15) : link}}
                </div><br>
                <a :href="link" class="visit">
                    Visit
                </a>
            </div>
        </template>
        <a :href="url" class="text-lg loading cursor-pointer flex items-center w-full p-3 hover:text-green-200 bg-opacity-95 transition-colors" v-else>
            <svg class="mr-1 inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path d="M208.61 118.1l-28.283 28.285a50.057 50.057 0 0 1-70.711 0a6 6 0 0 1 8.484-8.485a38.046 38.046 0 0 0 53.741 0l28.284-28.285a38 38 0 0 0-53.74-53.74l-19.8 19.799a6 6 0 0 1-8.484-8.485L137.9 47.391a50 50 0 1 1 70.71 70.709zm-79.195 62.226l-19.8 19.799a38 38 0 1 1-53.74-53.74L84.16 118.1a38.046 38.046 0 0 1 53.74-.001a6 6 0 0 0 8.485-8.485a50.055 50.055 0 0 0-70.71 0L47.39 137.9a50 50 0 0 0 70.71 70.71l19.799-19.8a6 6 0 1 0-8.484-8.484z" fill="currentColor"></path></svg>
            {{url}} 
        </a>
    </div>
</template>
<script>
export default {
    props: {
        url: {type: String, default: "https://example.com"},
    },
    data: () => ({
        link: null,
        title: null,
        description: null,
        img: null,
        _meta: {},
        parsed_meta: {},
    }),
    async mounted(){
        console.log("Loading, ", this.url);
        this._meta = await this.meta(this.url);
        let parsed = this.parsed_meta = this.parseMeta(this._meta);
        console.log("Loaded and parsed link preview: ", this.url);
        this.link = this.url;
        this.title = parsed.title;
        this.description = parsed.description;
        this.img = parsed.image;
        console.log("Updated page", {link: this.link, title: this.title, description: this.description, img: this.img})
    },
    methods: {
        host(link){
            return new URL(link).hostname
        },
        slice: (text, words) => {
            return text.split(" ").slice(0, words).length === words ? text.split(" ").slice(0, words).join(" ") + "..." : text
        },
        handleError(img_el){
            if (img_el.src.startsWith("https://cors.explosionscratc.repl.co")){
                console.log("Already cors");
                this.img = null;
                img_el.remove()
            } else {
                console.log(img_el)
                return img_el.src = `https://cors.explosionscratc.repl.co/${img_el.src.split("//")[1]}`
            }
        },
        parseMeta(m) {
            return {
                image: m ?.og ?.image || m["twitter:image:src"] || m.image,
                title: m.title || m ?.twitter ?.title || m ?.og ?.title || m ?.og ?.site_name,
                description: m.description || m ?.og ?.description || m ?.twitter ?.description,
                image_alt: m ?.og ?.["image:alt"],
                color: m["theme-color"],
                icon: (m.icon || m.favicon || m["alternate icon"] || m["shortcut icon"] || m["alternate-icon"] || m["shortcut icon"] || m["fluid-icon"])?.replace(window.location)
            }
        },
        async meta(url) {
            //Parse HTML as a document element
            var parser = new DOMParser();
            var html = window.html = parser.parseFromString(await fetch(`https://cors.explosionscratc.repl.co/${url.split("//")[1]}`).then(res => res.text()), 'text/html');
            var base = document.createElement("base");
            // Prevent relative links linking to the current domain
            // https://stackoverflow.com/a/56025841/14197829
            base.href = new URL(url).origin
            html.head.appendChild(base)

            //Create objects for meta tags that are in the form "og:url", "twitter:image_src" etc
            var out = {};
            if (html.querySelector("title")) {
                out.title = html.querySelector("title").innerText;
            }
            [...html.querySelectorAll("meta[property], meta[name]")].filter(i => /^[^:]+:[^:]+/.test(i.getAttribute("property") || i.getAttribute("name"))).map(i => {
                var m = (i.getAttribute("property") || i.getAttribute("name")).match(/^([^:]+):(.+)/);
                out[m[1]] = out[m[1]] || {};
                out[m[1]][m[2]] = i.getAttribute("content");
            });
            return {
                //Other meta tags and link tags
                ...Object.fromEntries([
                    ...[...html.querySelectorAll("link")].map((i) => [i.rel, i.href]),
                    ...[...html.querySelectorAll("meta[name], meta[value]")].map((i) => [
                        i.name,
                        i.getAttribute("content") || i.getAttribute("value"),
                    ]),
                ]),
                ...out,
            };
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../static/css/base";
	* {
		box-sizing: border-box;
	}
	.link_preview {
        font-size: 13px !important;
		margin: 15px auto;
		display: flex;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 3px 2px 10px -5px #0004;
	}
	.img {
		display: block;
		flex: 1;
  }
	.img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.right {
		flex: 2;
		padding: 10px;
		color: #ccc;
		padding-bottom: 20px;
	}
	.right .description {
		color: #ccc;
	}
	.right .visit {
        transition: all .3s ease;
		width: fit-content;
		display: block;
		text-decoration: none;
		padding: 6px 15px;
		border-radius: 5px;
		background: transparent;
		border: 2px solid $base-color;
		color: lighten($base-color, 20);
        &:hover {
            background: rgba($base-color, .1);
        }
	}
	.right .visit:hover {
	  box-shadow: 0 0 0 2px rgba($base-color, .1);
	}
	@media (max-width: 400px){
		.link_preview {
			flex-direction: column;
			box-shadow: 1px 2px 10px -5px #0009;
		}
		.link_preview .right .visit {
			width: 100%;
			padding: 10px;
			border-radius: 6px;
			text-align: center;
			background: darken($base-color, 20);
			color: lighten($base-color, 20);
		}
	}
</style>