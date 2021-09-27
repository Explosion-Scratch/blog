<template>
  <div id="scroll-container">
      <span id="scroll-progress"></span>
  </div>
</template>

<script>
export default {
	created(){
		if (process.browser){
			document.addEventListener("scroll", function(){
				document.querySelector("#scroll-progress").style.width = `${((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100)}%`;
			});
		}
	}
};
</script>

<style lang="scss">
@import "../static/css/base";

#scroll-container {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  background: transparent;
  height: 3px;
  width: 100vw;
  z-index: 10000000;
}
#scroll-progress {
  background: linear-gradient(to right, $base-color, adjust-hue($base-color, 40));
  display: block;
  width: 0%;
  height: 3px;
  transition: width .3s ease;
}
</style>