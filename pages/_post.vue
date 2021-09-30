<template>

        <!-- Styles defined in ../static/css/main.scss -->
        <div class="app_container max-w-[600px] w-5/6">
            <Progress />
            <div id="info" class="mb-4 w-full">
                <h1 class="title text-center">{{page.title}}</h1>
                <span class="date">
                    {{date_format.format(new Date(page.createdAt))}}
                    <template v-if="page.createdAt !== page.updatedAt">(Edited {{date_format.format(new Date(page.updatedAt))}})</template>
                </span>
				<hr class="w-full mt-2 mb-5">
            </div>
            <NuxtContent
            class="prose dark:prose-light prose-sm sm:prose lg:prose-lg w-full"
            :document="page"
            />
			<RecentPosts class="w-screen mt-28" :posts="posts" :currentPost="page"></RecentPosts>
			<AppFooter></AppFooter>
        </div>
</template>
<script>
import Progress from "../components/Progress.vue";
import generate_meta from "../meta.js";

export default {
	async asyncData({ $content, params }) {
		const page = await $content(params.post).fetch();
		return {
			page,
			posts: await $content("/").limit(4).fetch(),
		};
	},
	head(){
		const meta = {
			description: this.page.description,
			color: "#42b883",
			url: `https://explosion-scratch.github.io/blog${this.page.path}`,
			title: this.page.title,
			image: "full_logo.png",
		}
		var generated = generate_meta(meta);
		console.log(generated)
		return {
			title: this.page.title,
			meta: generated
		}
	},
	components: {Progress},
	data(){
		return {
			page: null, 
			date_format: new Intl.DateTimeFormat("en-US", {
				hour: "numeric",
				weekday: "long",
				day: "numeric",
				month: "long",
			}),
		};
	},
    mounted(){
        if (process.browser){
			fetch("/blog/twemoji.min.js").then(res => res.text()).then((text) => {
				eval(text);
				console.log("Evaluated, ", twemoji)
				var style = document.createElement("style");
				style.innerHTML = `img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
 }`
				document.body.appendChild(style);
				twemoji.parse(document.querySelector(".app_container"));
			});
            function wrap(el, wrapper) {
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
            for (let img of document.querySelectorAll(".prose img")){
                var newDiv = document.createElement("div");
                newDiv.classList.add("img_wrapper")
                wrap(img, newDiv)
            }
        }
    },
	created(){
		if (process.browser){
			if (location.hash){
				var el = document.querySelector(location.hash);
				if (el){
					el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
					el.classList.add("scrollto");
				}
			}
			document.addEventListener("click", (e) => {
				if (["H1", "H2", "H3"].includes(e.target.tagName)){
					var url = new URL(location.href);
					url.hash = e.target.id
					history.replaceState({}, "", url.toString());
				}
			});
		}
	},
};
</script>