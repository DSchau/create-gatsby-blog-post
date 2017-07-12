# `create-gatsby-blog-post`

A utility and CLI to scaffold out a blog post that follows the gatsby `pages/` format, including a MD file with some default frontmatter (data) set up.

## Set up

`yarn add create-gatsby-blog-post --dev`

or for gloabl usage

`yarn global add create-gastby-blog-post`

## Usage

### Programatic

```javascript
const { createPost } = require('create-gatsby-blog-post');

createPost('hello-world'); // will create the folder `src/pages/07-07-2017-hello-world`
```

### CLI

The utiliy can be installed globally (`-g`), but typically I prefer to use NPM scripts, like so:

```json
{
  "scripts": {
    "create-post": "create-post"
  }
}
```

```bash
npm run create-post -- --use-new-line false hello-world
```
