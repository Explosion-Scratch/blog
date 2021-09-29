<template>
  <form action="https://formsubmit.co/your@email.com" method="POST">
     <h2>Send me a message</h2>
     <div class="input">
        <label for="username">Username</label>
         <input id="username" type="text" name="username" placeholder="Username or real name" required>
     </div>
     <div class="input">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" placeholder="Email" required>
     </div>
     <div class="input">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Message"></textarea>
     </div>
     <button type="submit">Send</button>
   </form>
</template>

<script>
export default {
    name: "ContactForm"
}
</script>

<style scoped lang="scss">
@import "../static/css/base";

$base-color: #42b883;
$background: #19212b;
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
    transition: box-shadow .3s ease;
    width: 500px;
    background: rgba($base-color, .2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-shadow: none;
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
            color: darken($base-color, 20);
            font-family: sans-serif;
        }
        label[for='message']{
            top: 25px;
        }
        &:focus-within label {
            top: -10px;
            left: 3px;
        }
    }
    textarea {
        height: 300px;
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