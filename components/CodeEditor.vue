<template>
  <iframe @load="init" class="codeeditor w-full h-full" src="https://yj639.csb.app/"></iframe>
</template>

<script>
export default {
    name: 'CodeEditor',
    data(){
        return {
            id: null,
        }
    },
    methods: {
        init(){
            this.$el.contentWindow.postMessage({fromParent: true, action: "language", data: this.language}, "*");
            this.$el.contentWindow.postMessage({fromParent: true, action: "update", data: this.code}, "*")
        }
    },
    props: {
        language: {type: String, default: "html"},
        code: {type: String, default: ""}
    }
}
</script>
