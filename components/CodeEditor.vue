<template>
  <iframe @load="init" class="codeeditor block h-96 w-full" src="https://yj639.csb.app/"></iframe>
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
            this.$el.contentWindow.postMessage({fromParent: true, action: "update", data: this.code.replace(/__BREAK__/g, "\n")}, "*")
        }
    },
    props: {
        language: {type: String, default: "html"},
        code: {type: String, default: ""}
    }
}
</script>
