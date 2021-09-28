<template>
  <button data-ripple :data-time="time" :data-color="color" :data-event="event" :data-opacity="opacity">
      <slot></slot>
  </button>
</template>

<script>
export default {
    name: "RippleButton",
    props: {
        time: {type: Number, default: 500},
        color: {type: String, default: "#42b883"},
        event: {type: String, default: "mousedown"},
        opacity: {type: Number, default: .3},
        disabled: {type: Boolean, default: false},
    },
    async mounted(){
        if (process.browser){
            if (this.disabled){
                this.$el.setAttribute("disabled", "disabled");
            }

            (function ripple(el, opts = {}) {
                const time = opts.time || (+el.getAttribute("data-time") || 1000) * 3;
                const color = opts.color || el.getAttribute("data-color") || "currentColor";
                const opacity = opts.opacity || el.getAttribute("data-opacity") || ".3";
                const event = opts.event || el.getAttribute("data-event") || "click";
                el.style.overflow = "hidden";
                el.style.position = "relative";
                el.addEventListener(event, (e) => {
                    if (el.disabled) return;
                    var ripple_div = document.createElement("DIV");
                    ripple_div.style.position = "absolute";
                    ripple_div.style.background = `${color}`;
                    ripple_div.style.borderRadius = "50%";
                    var bx = el.getBoundingClientRect();
                    var largestdemensions;
                    if (bx.width > bx.height) {
                        largestdemensions = bx.width * 3;
                    } else {
                        largestdemensions = bx.height * 3;
                    }
                    ripple_div.style.pointerEvents = "none";
                    ripple_div.style.height = `${largestdemensions}px`;
                    ripple_div.style.width = `${largestdemensions}px`;
                    ripple_div.style.transform = `translate(-50%, -50%) scale(0)`;
                    ripple_div.style.top = `${e.pageY - (bx.top + window.scrollY)}px`;
                    ripple_div.style.left = `${e.pageX - (bx.left + window.scrollX)}px`;
                    ripple_div.style.transition = `opacity ${time}ms ease, transform ${time}ms ease`;
                    ripple_div.removeAttribute("data-ripple");
                    ripple_div.style.opacity = opacity;
                    el.appendChild(ripple_div);
                    setTimeout(() => {
                    ripple_div.style.transform = `translate(-50%, -50%) scale(1)`;
                    ripple_div.style.opacity = "0";
                    setTimeout(() => {
                        ripple_div.remove();
                    }, time);
                    }, 1);
                });
            })(this.$el)
            function elementReady(selector) {
                return new Promise((resolve, reject) => {
                    const el = document.querySelector(selector);
                    if (el) {resolve(el);}
                    new MutationObserver((mutationRecords, observer) => {
                    // Query for elements matching the specified selector
                    Array.from(document.querySelectorAll(selector)).forEach((element) => {
                        resolve(element);
                        //Once we have resolved we don't need the observer anymore.
                        observer.disconnect();
                    });
                    })
                    .observe(document.documentElement, {
                        childList: true,
                        subtree: true
                    });
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../static/css/base";
    button {
        &[disabled]{
            opacity: .5;
            cursor: not-allowed;
            filter: grayscale(100%);
        }
        &:hover {
            background: rgba(adjust-hue($base-color, 20), .1);
        }
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
</style>