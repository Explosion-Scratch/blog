<template>

        <!-- Styles defined in ../static/css/main.scss -->
        <div class="app_container max-w-xl w-5/6">
            <Progress />
            <div id="info" class="mb-4">
                <h1 class="title text-center">{{page.title}}</h1>
                <span class="date">
                    {{date_format.format(new Date(page.createdAt))}}
                    <template v-if="page.createdAt !== page.updatedAt">(Edited {{date_format.format(new Date(page.updatedAt))}})</template>
                </span>
				<hr class="w-full mt-1">
            </div>
            <NuxtContent
            class="prose dark:prose-light prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
            :document="page"
            />
        </div>
</template>
<script>
import Progress from "../components/Progress.vue";

export default {
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
					history.replaceState({}, "", `#${e.target.id}`);
				}
			});
		}
	},
	async asyncData({ $content }) {
		const page = await $content("hello").fetch();
		console.log(page);
		return {
			page,
		};
	},
};
</script>