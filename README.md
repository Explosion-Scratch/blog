![image](https://user-images.githubusercontent.com/61319150/135258792-a742d3d7-5246-4348-bd5b-cf1972a288b9.png)

# Blog

Epic blog I made: https://explosion-scratch.github.io/blog

Uses tailwind, Nuxt and SCSS.

# A note on copyright
- People seem to like to copy my websites ([for example](https://mmroshani.github.io/)), and I am not ok with that.
- If you want to use the code/posts/styling, anything from this website you must:
  - License the new work under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
  - Give me credit near the top of the README of the repo or in the project description
  - Give me credit on the site
  - Credit should link to [my github profile](https://github.com/explosion-scratch) and mention that the said work is a fork.
  - These terms can change at any time with no notice.
- As for using _sections_ of this repo:
  - Ask via an issue and I can grant granular permission to use something like a function, component, or style without giving permission in the whole project.
- Giving credit in the README is exempted if the repository has been forked using GitHub's "fork" button and shows a link near the title of the repo.

# How stuff is made:

## Front page:
![image](https://user-images.githubusercontent.com/61319150/135258815-d289641e-0edd-40ee-b633-7f7900ab94f9.png)
Uses the CSS `drop-shadow` on the svg path to create the ripple effect, which is randomly built at runtime with 10 different keyframes.

![image](https://user-images.githubusercontent.com/61319150/135258937-3debc5dd-48c1-419e-bb71-06be0e0f6602.png)
Postlist uses Nuxt content to get the post data, then TailwindCSS to style the cards, then SCSS for the finer details (E.g. specific colors)


## Post page:
![image](https://user-images.githubusercontent.com/61319150/135259097-dce13102-186c-4ad5-9476-548d43d90e17.png)
Scroll progress bar at the top of the post page measures scroll progress using JavaScript then sets the CSS width of the progress element. There is also a transition applied to the width to make it look nice.

![image](https://user-images.githubusercontent.com/61319150/135259231-a5e431f9-01be-4dc7-9a02-9038c426a62c.png)
Header is scrolled out of view for the first 150px, then it silently re-appears and is shown when the user hovers their mouse towards the top of the screen. This makes it unobtrusive but still useful for users.

![image](https://user-images.githubusercontent.com/61319150/135259342-25b85073-7112-4fe0-ba88-b9e76fd0710a.png)
Title of the post is gradient colored with the following CSS:
```scss
.title {
  color: transparent;
  //Autoprefixer makes this -webkit-background-clip
  background-clip: text;
  background: linear-gradient(to right, greenishcolor, blueishcolor);
}
```

![image](https://user-images.githubusercontent.com/61319150/135259523-b23b2827-e589-4a92-9544-fd45636faeab.png)
Post is rendered from markdown using NuxtContent and Tailwind Prose. Code theme is Prism Duotone Sea

![image](https://user-images.githubusercontent.com/61319150/135259632-c6f8cd2f-5a8e-4c68-95ac-7ac315ff47c4.png)
Interactive examples are made using a vue component, and they reside in an iframe. Read more [here](https://explosion-scratch.github.io/blog/codeeditors)

![image](https://user-images.githubusercontent.com/61319150/135259745-ae717bab-229f-4048-b2e9-e5f1b6bc733c.png)
Bottom buttons take the current post index and use JavaScript to figure out if there is a post after or before the current post, and then they link to it if needed. THis is done server side when the site is built.

![image](https://user-images.githubusercontent.com/61319150/135259851-bf9f528a-48ad-4850-ad21-1aeaf9f4a247.png)
Footer uses TailwindCSS to style most of it. Then The same ripple effect as the front page does with added styling tweaks using SCSS.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
