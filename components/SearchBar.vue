<template>
        <div class="search_container flex flex-col justify-center items-center">
            <div class="search">
                <svg @click="focusInput" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" fill="currentColor"/></svg>
                <input @keyup.enter="search" type="search" placeholder="Search all articles">
            </div>
            <RippleButton>Search</RippleButton>
        </div>
</template>
<script>
export default {
    name: "SearchBar",
    methods: {
        focusInput(){
            this.$el.querySelector("input").focus();
        },
        search(){
            if (!process.browser) return;
            var val = this.$el.querySelector("input").value
            this.$dispatch("searched", val);
            console.log("User searched %o", val);
            localStorage.setItem("searched", val)
        }
    },
    mounted(){
        if (!process.browser) return;
        this.$el.querySelector("input").value = localStorage.getItem("searched")
    }
}
</script>
<style scoped lang="scss">
@import "../static/css/base";

$width: clamp(80px, 100%, 300px);

.search {
    float: right;
    position: relative;
    right: 0;
    margin-right: 5px;
    border-radius: 3px;
    width: 45px;
    border: 2px solid rgba($base-color, .1);
    background: transparent;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:focus, &:focus-within {
        box-shadow: 0 0 0 4px rgba($base-color, .2);
    }
    input {
        width: 0px;
        padding: 0px;
    }
    svg {
        padding: 4px;
        color: $base-color;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        font-size: 1.7rem;
    }
    input {
        border: none;
        outline: none;
        background: transparent;
        overflow: hidden;
        color: lighten($base-color, 30);
        caret-color: $base-color;
    }
    &:hover {
        background: rgba($base-color, .1);
    }
    & input::placeholder {
        color: rgba(lighten($base-color, 20), .4);
    }
    input::-webkit-search-cancel-button {
        display: none;
    }
    &:focus-within {
        width: $width;
        border-radius: 100px;
        input {
            width: $width;
            padding: 7px;
        }
        
        svg {
            margin-left: 8px;
        }
    }
}
button {
    display: none;
}
@media (min-width: 600px){
    .search {
        height: 100%;
    }
}
@media (max-width: 600px){
    .search:not(:focus-within){
        height: 100%;
    }
    .search_container:focus-within {
        position: fixed;
        inset: 0;
        background: rgba(darken($base-color, 20), .8);
        height: 100vh;
        width: 100vw;
        z-index: 100;
    }
    .search_container:focus-within {
        button {
            display: inline-flex;
            margin-top: 110px;
            width: $width;
            justify-content: center;
            align-items: center;
        }
        input {
            width: 70vw;
        }
        background: darken($base-color, 20);
        box-shadow: 0 0 0 5px rgba(lighten($base-color, 10), .1);
        color: darken($base-color, 30);
        svg {
            color: lighten($base-color, 10);
        }
    }
}
</style>