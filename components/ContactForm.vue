<template>
  <div class="contactform">
    <RippleSvg />
    <form action="https://formsubmit.co/explosionscratch@gmail.com" method="POST">
        <h2>Send me a message</h2>
        <input type="hidden" name="_subject" value="[Blog] Contact form submission">
        <input type="hidden" name="_next" value="https://explosion-scratch.github.io/blog/test">
        <input type="hidden" name="_captcha" value="false">
        <div class="input">
            <input id="username" type="text" name="username" placeholder="Username or real name" required>
            <label for="username">Username</label>
        </div>
        <div class="input">
            <input id="email" type="email" name="email" placeholder="Email" required>
            <label for="email">Email</label>
        </div>
        <div class="input">
            <textarea id="message" name="message" placeholder="Message"></textarea>
            <label for="message">Message</label>
        </div>
        <RippleButton type="submit">Submit</RippleButton>
    </form>
   </div>
</template>

<script>
export default {
    name: "ContactForm"
}
</script>

<style scoped lang="scss">
@import "../static/css/base";

.ripple {
    position: absolute;
    top: 0;
    right: 0;
    opacity: .4;
}

body {
    background: $background;
    display: flex;
    justify-content: center;
    align-items: center;
}
* {
    box-sizing: border-box;
}
form {
    width: clamp(300px, 60vw, 450px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: box-shadow .3s ease, background-color .3s ease;
    width: 500px;
    background: rgba(darken($base-color, 20), .2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-shadow: none;
    &:hover, &:focus-within {
        background: rgba($base-color, .3);
    }
    &:focus-within {
        box-shadow: 0 0 0 10px rgba(adjust-hue($base-color, 30), .05);
    }
    &:hover {
        box-shadow: 0 0 0 5px rgba($base-color, .1);
    }
    &:hover:focus-within {
        box-shadow: 0 0 0 5px rgba($base-color, .1), 0 0 0 10px rgba(adjust-hue($base-color, 30), .05);
    }
    h2 {
        font-size: clamp(1rem, 2.5vw, 2rem);
        color: lighten($base-color, 20);
        font-family: sans-serif;
        font-weight: 900;
    }
    .input {
        margin-top: 25px;
        position: relative;
        label {
            transition: all .3s ease;
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translate(0, -50%);
            color: rgba(lighten($base-color, 30), .3);
            font-family: sans-serif;
        }
        label[for='message']{
            top: 25px;
        }
        &:focus-within label {
            top: -10px;
            left: 3px;
        }
        input, textarea {
            &:focus {
                outline: none;
            }
            &:not(:placeholder-shown) {
                & ~ label {
                    top: -10px;
                    left: 3px;
                }
            }
        }
    }
    textarea {
        height: 100px;
    }
    button, input, textarea {
        width: 100%;
        padding: 15px;
        border: 2px solid $base-color;
        border-radius: 5px;
        background: transparent;
        margin: 4px;
        color: lighten($base-color, 30);
        transition: all .3s ease;
        &::placeholder {
          color: transparent;
        }
        &:hover, &:focus {
            background: rgba($base-color, .1);
        }
        &:focus {
            box-shadow: 0 0 0 3px rgba($base-color, .1), 0 0 0 4px rgba(adjust-hue($base-color, 40), .1);;
        }
    }
}
</style>