<template>
    <svg class="ripple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 520">
		<path d="M0,32L48,69.3C96,107,192,181,288,197.3C384,213,480,171,576,176C672,181,768,235,864,240C960,245,1056,203,1152,197.3C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
	</svg>
</template>
<script>
export default {
    name: "RippleSvg",
}
</script>
<style lang="scss" scoped>
@import "../static/css/base";

$bg: $base-color;
.ripple {
	fill: $bg;
	transition: filter 0.5s ease;
	width: 100vw;
	display: block;
	margin: 0 auto;
	animation: shadowPulse 20s linear infinite;
}
</style>