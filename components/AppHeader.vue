<template>
  <div class="page">
    <header class="shown flex justify-between items-center p-6">
      <h1 id="logo" class="text-2xl font-light flex items-center justify-center cursor-pointer"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="bx:bx-code-curly" style="vertical-align: -0.125em; transform: rotate(360deg);"><path d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3c0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3c0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4c0 1.993.665 3.246 1.502 4c-.837.754-1.502 2.007-1.502 4c0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z" fill="currentColor"></path></svg> Blog</h1>
      <nav class="flex">
        <ul class="flex justify-center items-center">
          <li><a href="/">Home</a></li>
          <li><a href="mailto:explosionscratch@gmail.com">Contact</a></li>
        </ul>
      </nav>
    </header>
    <div class="page">
        <h1>Hello</h1>
        <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
$base-color: #32a0a8;

body {
    background: complement(darken($base-color, 40));
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

svg {
    color: darken($base-color, 10);
}

header {
    top: 0;
    position: fixed;
    width: 100vw;
    color: lighten($base-color, 40);
    ul > li {
        padding: 8px 20px;
        border-radius: 4px;
        margin: 0 3px;
        background: transparent;
        color: lighten($base-color, 10);
        transition: background-color .3s ease, color .3s ease, transform .1s ease, transform .3s ease, box-shadow .2s ease;
        border: 2px solid desaturate($base-color, 20%);
        &:hover {
            cursor: pointer;
            box-shadow: 2px 2px;
            transform: translate(-3px, -3px);
        }
        &:active {
            transform: scale(.95);
        }
    }
}
</style>