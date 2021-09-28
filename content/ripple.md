---
title: Recreating the material design ripple effect
description: A breif explanation and tutorial for how to make the best buttons you've ever seen!
category: Material design, JavaScript, Buttons
createdAt: Monday, September 27 2021, 5:30 PM
---

I've always wanted to make that nice, satisfying ripple effect that you can see on google's apps and stuff. It is just so **satisfying**:

<RippleButton class="w-full">BUTTONS YAY!</RippleButton>

### What I wanted out of a ripple effect
Here's what I wanted out of my ripple effect:

- Reuseable - I wanted to be able to easily reuse the ripple effect so that if a button or something was added through javascript DOM manipulation it. 
- Customizeable - It needed to be customizeable, the speed, color, and opacity of the ripples
- Easy to use - It needed to be simple to use.
- Lightweight - I don't want to make a 2000 line library for a ripple effect. More like 40 lines is better.  

## Step 1: Containing the ripple
I also wanted to contain the ripple effect in the button element (or any other element that I wanted to have the effect), so that means that the element has to have `overflow: hidden` in its CSS. _Also_ meaning that the ripple element has to be a child of the element that was clicked.

## Step 2: Getting the position for the ripple element
This was a BIG headache. I needed to get the position for the ripple but I wanted it to scroll with the page. I also needed to take into account the mouse position when clicking. To do this I used `getBoundingClientRect()`. That seemed to work pretty well, but there were still a lot of bugs.

## Step 3: Fixing TONS of bugs
I'm just gonna skim over the bug fixing part, basically the ripple's weren't positioned right, they didn't transition, you couldn't click multiple times and have multiple ripples, and the ripple elements didn't go away. Big problems. 

## Step 4: The final code:
```js
function ripple(el, opts = {}) {
    const time = opts.time || (+el.getAttribute("data-time") || 1000) * 3;
    const color = opts.color || el.getAttribute("data-color") || "currentColor";
    const opacity = opts.opacity || el.getAttribute("data-opacity") || ".3";
    const event = opts.event || el.getAttribute("data-event") || "click";
    el.style.overflow = "hidden";
    el.style.position = "relative";
    el.addEventListener(event, (e) => {
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
}
```

## How to use this code 🤦

I [hosted the code on GitHub](https://github.com/explosion-scratch/ripple) so that I could keep track of versions and use a CDN to import it, but it's pretty simple to use the code! Just call `ripple(element)` when you have an element in the DOM that's similar to this:
```html
<button onload="ripple(this)">Ripple button</button>
```
Nowww we get this:

<RippleButton class="w-full">Click me!</RippleButton>


## Options
Like I said earlier, we want it to be customizeable, where is the customization?! Turns out I added attributes to control the ripples, here they are!

| Attribute      | What it does                                           | Default        |
|----------------|--------------------------------------------------------|----------------|
| `data-ripple`  | Turns on the ripple effect                             | -              |
| `data-time`    | The time in milliseconds that the ripple effect takes. | `500`          |
| `data-color`   | The color of the ripple.                               | `currentColor` |
| `data-opacity` | The opacity of the ripple effect.                      | `.3`           |
| `data-event`   | The event to ripple on.                                | `mousedown`    |

So yeah, have fun! I hope that this blog post has been useful, or at least somewhat interesting! Feel free to use the ripple effect (with credit ofc) and keep coding!

- Bye for now

[--Explosion--](https://notes.explosionscratc.repl.co/Explosion-Scratch)