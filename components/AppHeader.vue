<template>
    <header class="shown flex justify-between items-center p-3 dark:bg-transparent bg-gray-200 bg-opacity-10 dark:bg-opacity-5">
      <script src="https://rawcdn.githack.com/Explosion-Scratch/ripple/dccaf32e995242fa4b63509003eba7ba6efb3195/ripple.js"></script>
      <NuxtLink to="/"><Logo class="h-10"/></NuxtLink>
      <nav class="flex">
        <SearchBar/>
        <ul class="ml-2 flex justify-center items-center">
          <NuxtLink to="/">
            <RippleButton class="rplbtn">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M22 20v-7.826a4 4 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L3.253 9.266A4 4 0 0 0 2 12.174V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
              Home
            </RippleButton>
          </NuxtLink>
          <NuxtLink to="/contact">
            <RippleButton class="rplbtn">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M12 8v3m0 0v3m0-3h3m-3 0H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172C2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225c-.492-.33-.399-1.355-.212-3.404L6.5 17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g></svg>
              Contact
            </RippleButton>
          </NuxtLink>
        </ul>
      </nav>
    </header>
</template>

<script>
export default {
	created(){
		if (process.browser){
			var lastScrollTop = 0;
      document.addEventListener("mousemove",(e) => {
        if (window.innerHeight -(window.innerHeight - e.clientY) < 100){
          document.querySelector("header").classList.add("shown");
        }
      })
			document.addEventListener("scroll", () => {
				var st = window.pageYOffset || document.documentElement.scrollTop;
				  if (st > lastScrollTop){
				  		document.querySelector("header").classList.remove("shown");
				  } else {
				  		// document.querySelector("header").classList.add("shown");
				  }
				  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
				  if (window.scrollY < 100){
            document.querySelector("header").style.transition = "none";
            document.querySelector("header").style.top = `-${window.scrollY}px`;
				  	// document.querySelector("header").classList.add("shown");
				  } else {
            document.querySelector("header").style.top = null;
            document.querySelector("header").style.transition = "top .8s ease";
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


.rplbtn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  svg {
    display: block;
    font-size: 1rem;
    margin-right: 4px;
  }
}
@media (max-width: 500px){
  .rplbtn {
    font-size: 0px;
    svg {
      display: block;
      font-size: 1rem;
      margin-right: none;
    }
    border: none !important;
  }
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