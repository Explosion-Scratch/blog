<template>
    <header class="shown flex hover:shadow-md justify-between items-center p-3 dark:bg-gray-500 bg-gray-200 bg-opacity-10 dark:bg-opacity-5">
      <script src="https://rawcdn.githack.com/Explosion-Scratch/ripple/dccaf32e995242fa4b63509003eba7ba6efb3195/ripple.js"></script>
      <h1 id="logo" class="text-2xl font-light flex items-center justify-center cursor-pointer"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="bx:bx-code-curly" style="vertical-align: -0.125em; transform: rotate(360deg);"><path d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3c0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3c0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4c0 1.993.665 3.246 1.502 4c-.837.754-1.502 2.007-1.502 4c0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z" fill="currentColor"></path></svg> Blog</h1>
      <nav class="flex">
        <ul class="flex justify-center items-center">
          <NuxtLink to="/"><li data-ripple data-color="#42b883" data-event="mousedown" data-time="500">Home</li></NuxtLink>
          <a href="mailto:explosionscratch@gmail.com"><li data-ripple data-color="#42b883" data-event="mousedown" data-time="500">Contact</li></a>
        </ul>
      </nav>
    </header>
</template>

<script>
export default {
  mounted(){
    //Ripple effect
    ripple();
  },
	created(){
		if (process.browser){
			var lastScrollTop = 0;
			document.addEventListener("scroll", () => {
				var st = window.pageYOffset || document.documentElement.scrollTop;
				  if (st > lastScrollTop){
				  		document.querySelector("header").classList.remove("shown");
				  } else {
				  		document.querySelector("header").classList.add("shown");
				  }
				  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
				  if (window.scrollY < 150){
				  	document.querySelector("header").classList.add("shown");
				  }
			});
		}
	}
};
</script>

<style lang="scss">
@import '../static/css/base';

svg {
    color: darken($base-color, 10);
}

header {
    z-index: 1000;
    backdrop-filter: blur(6px);
    top: -100px;
    position: fixed;
    width: 100vw;
    color: darken($base-color, 20);
    transition: top .8s ease, box-shadow .5s ease;
    .dark & {
      color: lighten($base-color, 40);
    }
    &.shown {
      top: 0;
    }
    ul li {
        padding: 8px 20px;
        border-radius: 4px;
        margin: 0 3px;
        background: transparent;
        color: darken($base-color, 20);
        .dark & {
          color: lighten($base-color, 10)
        }
        transition: background-color .3s ease, color .3s ease, transform .1s ease, transform .3s ease, box-shadow .2s ease;
        border: 2px solid desaturate($base-color, 20%);
        cursor: pointer;
        &:active {
            transform: scale(.95);
        }
    }
}
</style>