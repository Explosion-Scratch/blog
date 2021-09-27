<template>
    <div id="container" class="dark">
        <AppHeader />
        <Nuxt />
    </div>
</template>
<script>
import {dark} from "../static/css/base.scss";

export default {
    created(){
        if (process.browser){
            if (dark){
                console.log("Is dark");
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light-mode");
            }
        }
    }
}
</script>
