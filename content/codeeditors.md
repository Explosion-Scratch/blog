---
title: How I made working code examples in my blog
description: How I created a working code editor that I can now embed in my blog to demonstrate and run code!
category: Code editors,iframes,interactive
createdAt: Tuesday, September 28 2021, 10:00 AM
---

So, the title pretty much explains it! Basically I _really_ wanted a working code editor that I could embed in my blog to demonstrate and run code, but I didn't want it to be something like JSFiddle, CodeSandbox, etc, because those take FOREVER to load. I wanted to create my own. I wanted to create my own!

### Creating the initial code editor
To create the code editor itself I used a nifty library called [CodeFlask](https://kazzkiq.github.io/CodeFlask/). This was pretty simple to set up and stuff and I had a nice working code editor! But it didn't do anything (exept allow you to type there) 😭

### Linking the code editor to an iframe
Now I needed the code editor to run! I wanted to be able to preview HTML, CSS, and JavaScript. To do this I liked an update event to the codeflask code editor and updated the HTML with the script the user typed, pretty simple:
```js
flask.onUpdate((code) => {
    iframe.contentWindow.src = "about:blank";//Reload the iframe
    iframe.contentWindow.eval(code);//Evaluate the script
})
```

But wouldn't it also be super cool to be able to see console logs? That's what I'd be doing next:

```js
//NOTE: This script runs inside the iframe

//Store the old console just in case
var oldconsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    clear: console.clear
};
//Update each console method to post a message to the parent window (Remember, this is running in the iframe, so the parent window is the window with the code editor)
for (let fn of Object.keys(oldconsole)) {
    console[fn] = (...stuff) => {
        window.parent.postMessage(
        {
            type: fn,
            data: stuff.map(stringify),//Stringify is a custom function that uses JSON.stringify, but also supports HTMLElements, Functions and RegExps.
            // fromconsole just so I could be safe and not get any other messages.
            fromconsole: true
        },
        "*"
        );
    };
}
```

Now whenever the window receives a console message it updates an element with the result:
```js
window.addEventListener("message", ({ data }) => {
    var c = document.querySelector(".console");//The console element that shows the logs
    if (data.fromconsole) {
      if (data.type === "clear") {
        c.innerHTML = "";
        c.appendChild(el("clear", ["[Console was cleared]"]));
        return;
      }
      console.log(data.data);
      c.appendChild(el(data.type, data.data));
      return;
      //Creates an element based on the console log with 
      function el(type, data) {
        //Color the background and text of the console log
        var cols = {
          clear: "#0002",
          log: "#0002",
          info: "#00f2",
          warn: "#ff04",
          error: "#f003"
        };
        var brightCols = {
          clear: "#ccc",
          log: "#ccc",
          info: "#55f",
          warn: "#ff0",
          error: "#f55"
        };
        var out = document.createElement("div");
        out.setAttribute("class", `console_output console_${type}`);
        out.innerText = `[${type}] ${data.join(", ").replace(/, $/, "")}`;
        out.style.backgroundColor = cols[type];
        out.style.fontFamily = "monospace";
        out.style.color = brightCols[type];
        out.style.padding = "5px";
        return out;
      }
    }
  });
```

### Supporting non JavaScript languages
I also wanted my editor to support HTML and CSS as well, so I implemented a message system to receive messages from the parent window of the code editor, (the page embedding the code editor, in the case of my blog that's the blog page.)

Now I added _another_ messaging system that received messages from the parent window, this time when it got a message it ran certain scripts and stuff, so I added this to the previous message listener:
```js
if (data.action && data.fromParent) {
    switch (data.action) {
        case "update":
            flask.updateCode(data.data);
            break;
        case "clear":
            flask.updateCode("");
            break;
        case "language":
            var code = flask.getCode();
            document.querySelector(".editarea .codeflask").remove();
            flask = new CodeFlask(document.querySelector(".editarea > div"), {
            language: data.data,
            ...opts
            });
            flask.updateCode(code);
            flask.onUpdate(updated);
            break;
    }
}
``` 
Now, when the window is embedded in another, we can post a message to it:
```js
//Running from the blog window:

// Update language to HTML
document.querySelector("iframe").contentWindow.postMessage({fromParent: true, action: "language", data: "html"});

// Update the content!
document.querySelector("iframe").contentWindow.postMessage({fromParent: true, action: "update", data: "<h1>Hello world</h1>"});
```

### The final result:
The final result is like this(!!!)

<CodeEditor language="js" code="console.log('This is my code editor!');__BREAK____BREAK__console.info('Try typing stuff in it, it updates in real time!');__BREAK__document.write('<button>Click me!</button>');__BREAK__document.querySelector('button').onclick = () => alert('You clicked it!');" class="standout h-96"></CodeEditor>

You can find the full code [here](https://codesandbox.io/s/dark-dust-yj639).

Thanks for reading! Bye for now,

--Explosion--