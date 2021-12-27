---
title: Best IDEs for ChromeOS
description: Tools for coding on chromebooks
category: Coding, Chromebooks, How-to
createdAt: Sunday, December 26 2021, 6:06 PM
---

Let me just say something to start out with: I hate chromebooks. They're garbage. They are basically a chrome browser. That's literally it. Anyways, here's how to code on them if you're stuck with it.

# IDE's

## VSCode on chromebooks:

There are a number of IDEs that are avalible for coding on, but many don't work on chromebooks. I personally love using VSCode, but because it doesn't work on chromebooks, I can't. Here are a few ways to use VSCode on chromebooks:

### GitPod:

<LinkPreview url="https://gitpod.io"></LinkPreview>

Gitpod is an awesome thing. It's VSCode online, for free, with a whole terminal and everything, that said, it can be sort of slow, and you have limited hours of usage on their free tier.

### code-server

<LinkPreview url="https://github.com/coder/code-server"></LinkPreview>

This is about as close to fully responsive, awesome, VSCode you can get on chromeos, but it does require linux. This means running a command to start it every time you want to use it, which can be a bit tiring. I personally use gitpod just because it's easier.

To use it simply open up linux and paste this in!

```
curl -fsSL https://code-server.dev/install.sh | sh
```

(or go check it out on GitHub if you don't wanna just blindly run a script)

Then you can just run this to get it started:

```
code-server
```

Also you have to turn on port forwarding, so that `localhost:3000` actually works, just search for it in settings:

![Port forwarding on ChromeOS](https://user-images.githubusercontent.com/61319150/147423230-4d16c48b-f899-4279-8ae2-f01d872e61ac.png)

## Caret: Drop in replacement for the default text app

Linux and VSCode is awesome, but it can take a bit to get started, it's pretty much just quicker to open up the built in text editor for normal stuff. My personal favorite software for developing chrome extensions, simple file editing, and more is Caret.

<LinkPreview url="https://chrome.google.com/webstore/detail/caret/fljalecfjciodhpcledpamjachpmelml"></LinkPreview>

Caret is a simple, but better alternative to the built in text editor. It also has autocompletion, tabs, file browser, beautification (with an extension I made), and more! It also integrates really well with ChromeOS and it's pretty easy to make it the default file opener for `.js` and `.html` files.

## Online editors

Online editors are epic. They allow you to store your work super easily, in their really responsive in chrome. Just as responsive as any webpage. Here are some of the ones that I use:

### Codepen: Great for simple HTML, CSS and JS tests

Codepen is the thing everyone knows about. I find it somewhat useful but I don't like the ads or save notifications. I just use Codesandbox for that type of thing. It is useful when you just want to paste and test out something from stackoverflow.

### textarea.online: Just a place to test out JS with a blank page

I use this site all the time. It has a memorable domain, and it's just a blank page to tinker with. In addition to that, you can paste any text in the textarea, and it has a monospace font. Great place to test out userscripts, JS snippets, etc.

### beautifier.io: Beautification with an ok IDE

Sometimes you just need to make those files look noice.

### github.dev: GitHub online editor

Just press `.` on a repo. It's that simple

### Codesandbox.io

Codesandbox is my absolute favorite toolt for coding HTML, CSS and JS stuff. It has live reload, a nice editor, multiple file support, themes, and just about everything else. Totally go check that out.

# Developer resources:

Documentation and more, here we go:

## devdocs.io

<LinkPreview url="https://devdocs.io"></LinkPreview>
Devdocs is like the holy grail of documentation. Totally check that out.

## Intab resources

<LinkPreview url="https://intab.io/resources/"></LinkPreview>
This is a great website for finding new tools, frameworks, etc
