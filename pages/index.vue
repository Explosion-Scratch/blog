<template>
	<div class="_app_container_no_style w-screen">
		<section>
			<div class="top_stuff flex justify-center items-center">
				<div class="right">
					<h1 class="font-extrabold">CODISH</h1>
					<center class="px-5">A meaningless blog on the internet.</center>
					<div class="sidebyside flex justify-center items-center flex-col sm:flex-row">
						<RippleButton @click="scrollToPosts" opacity=".8" class="btn w-40 sm:w-auto">
						<svg class="viewsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c-2 0-5 1-5 5v9c0 3-5 5-5 5s5 2 5 5v11c0 4 3 5 5 5"/><path d="M32 4c2 0 5 1 5 5v9c0 3 5 5 5 5s-5 2-5 5v11c0 4-3 5-5 5"/></g></svg>
						View posts</RippleButton>
						<a href="https://github.com/explosion-scratch/blog" class="mt-2 sm:mt-0"><RippleButton opacity=".8" class="btn w-40 mt-2 sm:mt-0 sm:w-auto"><svg class="githubsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"/></g></svg>GitHub</RippleButton></a></div>
				</div>
			</div>
			<RippleSvg />
		</section>
		<div class="postlist_container flex items-center flex-col w-screen sm:-mt-20">
			<h2 class="text-xl postlist_title">Posts</h2>
			<BlogContainer class="posts w-5/6" :items="posts" />
		</div>
	</div>
</template>

<script>
export default {
	layout: "home",
	async asyncData({$content }) {
		return {
			posts: await $content("/").fetch()
		};
	},
	methods: { 
		scrollToPosts(){
			if (!process.browser) return;
			document.querySelector('.posts').scrollIntoView({behavior: 'smooth'})
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../static/css/base";

header {
	background: #0005;
}
.postlist_title {
	color: lighten($background, 40);
	font-weight: 900;
	font-size: 2rem;
}

section {
	width: 100vw;
	overflow: hidden;
	h1 {
		text-align: center;
		font-size: 12vmin;
		color: lighten($background, 10);
	}
	center {
		color: lighten($background, 15);
	}
	.sidebyside {
		margin-top: 20px;
	}
	.btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-color: lighten($base-color, 20);
		color: lighten($base-color, 20) !important;
		.viewsvg {
			stroke: lighten($base-color, 20) !important;
		}
		.githubsvg {
			fill: lighten($base-color, 20) !important;
		}
		svg {
			margin: 0 3px;
			color: lighten($base-color, 20) !important;
		}
	}
	.top_stuff {
		height: 50vh;
		background: linear-gradient(to bottom, rgba(adjust-hue($base-color, 40), .4), $base-color);
	}
}

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
