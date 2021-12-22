---
title: Svelte Components and Mixins I made for fun
description: Typing effect, easy CSS in JS and an epic link preview component!
category: Svelte, Components, Mixins, Frameworks
createdAt: Wednesday, December 22 2021, 4:16 PM
---

Ok, at this point I'm just bored so I'm writing blog articles. Anyways, this article is about Svelte! Components and mixins that I made in particular.

<details>
	<summary><b>What are components and mixins?</b></summary>

**Components**
Svelte is a great framework, and all pages can just be imported into other pages, easily, it's really as simple as this:

```html
<!-- Let's say this file is named Property.svelte -->
<script>
  export let propertyHere = "default value";
</script>

<button on:click={() => propertyHere = prompt('What do you want to change it to?')}>Click to change the property!</button>

<b>Currently the property is: {propertyHere}</b>
```

Then you can just import that like this:

```html
<script>
  import Property from "./Property.svelte";
</script>

<Property propertyHere="Cool" />
```

Pretty simple!

**Mixins:**
Mixins are like components, but instead of importing an HTML template you import a function that you can apply to anything:

```js
// This file is rainbow.js
//Seriously don't EVER use this code it's horrifying
export function rainbow(element) {
  let loop = () => {
    element.style.background =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    requestAnimationFrame(loop);
  };

  loop();
}
```

Then you can use them like this:

```html
<script>
  import { rainbow } from "./rainbow.js";
</script>

<h1 use:rainbow>Triggered</h1>
```

</details>

# The stuff that I made

I just wasted 15 minutes debugging the example above lol, here's the stuff I made.

## #1. A link preview component

<details>
  <summary>Full code</summary>
  
  ```html
  <script>
	import {onMount} from "svelte";
	export let link = "";
	let m, title, description, img, img_el;
	onMount(async () => {
		m = await meta(link);
		m = parseMeta(m);
		title = m.title;
		description = m.description;
		img = m.image;
	})
	function parseMeta(m) {
		return {
			image: m ?.og ?.image || m["twitter:image:src"] || m.image,
			title: m.title || m ?.twitter ?.title || m ?.og ?.title || m ?.og ?.site_name,
			description: m.description || m ?.og ?.description || m ?.twitter ?.description,
			image_alt: m ?.og ?.["image:alt"],
			color: m["theme-color"],
			icon: (m.icon || m.favicon || m["alternate icon"] || m["shortcut icon"] || m["alternate-icon"] || m["shortcut icon"] || m["fluid-icon"])?.replace(window.location)
		}
	}
	async function meta(url) {
		//Parse HTML as a document element
		var parser = new DOMParser();
		var html = window.html = parser.parseFromString(await fetch(`https://cors.explosionscratc.repl.co/${url.split("//")[1]}`).then(res => res.text()), 'text/html');
		var base = document.createElement("base");
		// Prevent relative links linking to the current domain
		// https://stackoverflow.com/a/56025841/14197829
		base.href = new URL(url).origin
		html.head.appendChild(base)

    	//Create objects for meta tags that are in the form "og:url", "twitter:image_src" etc
    	var out = {};
    	if (html.querySelector("title")) {
    		out.title = html.querySelector("title").innerText;
    	}
    	[...html.querySelectorAll("meta[property], meta[name]")].filter(i => /^[^:]+:[^:]+/.test(i.getAttribute("property") || i.getAttribute("name"))).map(i => {
    		var m = (i.getAttribute("property") || i.getAttribute("name")).match(/^([^:]+):(.+)/);
    		out[m[1]] = out[m[1]] || {};
    		out[m[1]][m[2]] = i.getAttribute("content");
    	});
    	return {
    		//Other meta tags and link tags
    		...Object.fromEntries([
    			...[...html.querySelectorAll("link")].map((i) => [i.rel, i.href]),
    			...[...html.querySelectorAll("meta[name], meta[value]")].map((i) => [
    				i.name,
    				i.getAttribute("content") || i.getAttribute("value"),
    			]),
    		]),
    		...out,
    	};
    }
    function slice(text, words){
    	return text.split(" ").slice(0, words).length === words ? text.split(" ").slice(0, words).join(" ") + "..." : text
    }
    function handleError(){
    	if (img_el.src.startsWith("https://cors.explosionscratc.repl.co")){
    		console.log("Already cors");
    		img = null;
    	} else {
    		console.log(img_el)
    		return img = `https://cors.explosionscratc.repl.co/${img_el.src.split("//")[1]}`
    	}
    }

</script>
<div class="link_preview">
	{#if title && link}
	  {#if img}
			<div class='img'>
				<img src={img} on:error={handleError} bind:this={img_el}/>	
			</div>
		{/if}
		<div class="right">
			<h3>
				<img src={`https://www.google.com/s2/favicons?domain=${new URL(link).hostname}`}/> {slice(title, 6)}
			</h3>
			<div class="description">
				{description ? slice(description, 15) : link}
			</div><br>
			<a href={link} class="visit">
				Visit
			</a>
		</div>
	{:else}
		<div class="loading">
			Loading...
		</div>
	{/if}
</div>
<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.link_preview {
		margin: 15px auto;
		display: flex;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 3px 2px 10px -5px #0004;
	}
	.img {
		display: block;
		flex: 1;
  }
	.img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.right {
		flex: 2;
		padding: 10px;
		color: #333;
		padding-bottom: 20px;
	}
	.right .description {
		color: #555;
	}
	.right .visit {
		width: fit-content;
		display: block;
		text-decoration: none;
		padding: 6px 15px;
		border-radius: 5px;
		background: transparent;
		border: 2px solid lightseagreen;
		color: #066;
	}
	.right .visit:hover {
	  box-shadow: 0 0 0 2px #0bb4;
	}
	@media (max-width: 400px){
		.link_preview {
			flex-direction: column;
			box-shadow: 1px 2px 10px -5px #0009;
		}
		.link_preview .right .visit {
			width: 100%;
			padding: 10px;
			border-radius: 6px;
			text-align: center;
			background: lightseagreen;
			color: white;
		}
	}
</style>
  ```
</details>

### What it does and how it works:

This is what it looks like by the way:

![Link preview effect in svelte](https://user-images.githubusercontent.com/61319150/147163445-410c9045-6a84-4336-a69b-2c04f2241899.png)

Basically it's super simple, you just use it like this:

```html
<Preview link="https://github.com"></Preview>
```

and it fetches the HTML of GitHub.com, finds meta tags, parses those and organizes those meta tags, then makes a nice little preview of it! I've personally implemented this on this blog, as you can see below:

<LinkPreview url="https://github.com/explosion-scratch"></LinkPreview>

## #2. CSS in JS in like 9 lines

This didn't take too long, but I still think that it's pretty useful! It allows you to change CSS values in Svelte incredibly easily! Use it like this:

```html
<script>
  let size = 18;
</script>
<h1 use:css={{fontSize: `${size}px`}}>Change the size of this font!</h1>

<button on:click={() => fontSize++}>Increase font size</button>
<button on:click={() => fontSize--}>Decrease font size</button>
```

And this is a **mixin** btw, scroll up if you forgot/didn't read what those are. Here's the full code for this:

```js
export function css(node, properties) {
  const setProps = (props) => {
    Object.keys(props).forEach((prop) => (node.style[prop] = props[prop]));
  };
  setProps(properties);
  return {
    update: setProps,
  };
}
```

## #3. Typing effect

This is a fun component that I made, it just changes the HTML of an element with a sort of 'typing' effect, it's pretty fun to try, and a neat thing!

Here's how it works:

```html
<script>
	import {typing} from "./typing.js";
</script>

I am <span use:typing={["awesome", "stupid", "coding"]}></span>
```

And here's the full code:

```js
import { onMount } from "svelte";
export async function typing(node, config) {
  if (!config.items) {
    config.items = config;
  }
  let texts = [...config.items];
  let index = 0;
  let current = "";
  while (true) {
    let item = texts[index];
    for (let letter of item) {
      current += letter;
      node.innerText = current;
      await sleep(config.typeTime || 200);
    }
    await sleep(config.endWait || 2000);
    for (let letter of item) {
      current = current.slice(0, current.length - 1);
      node.innerText = current;
      await sleep(config.deleteTime || 100);
    }
    await sleep(config.wordWait || 500);
    index++;
    if (index >= texts.length) {
      index = 0;
    }
  }
  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
```

Not much else to say on this one! It takes an array of things to type, or an object as config. The config can have these keys:

```js
let defaultConfig = {
  //The items to type
  items: [],
  //Time to wait before typing the next letter when typing a word
  typeTime: 200,
  //How long to wait after the text is typed before deleting the text and moving on to the next letter
  endWait: 2000,
  //The time to wait between each letter when deleting
  deleteTime: 100,
  //The amount of time to wait before starting a new word
  wordWait: 500,
};
```

Anyways, that's all for now! Bye!

--Explosion--
