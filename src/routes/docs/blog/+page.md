---
lastUpdate: 16/01/2025
---

# Blog

**SelfKit** makes it easy to create a blog using the power of Markdown. The Markdown is automatically converted to HTML during compilation.

## Add a blog post

1. Navigate to the ```posts``` folder at the root of the project.
2. Add a new file named ```[POST_TITLE].md```
3. Write your blog post in the file, for example:

```md
---
title: First post
description: First post.
date: '2024-10-10'
keywords:
  - Tutorial
  - Boilerplate
categories:
  - News
  - Article
published: true
image: example.jpg
---

## Title

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.


```

:::info
By default, we include two example blog posts to help you get started.
:::

:::note
If you're unfamiliar with Markdown, a cheat sheet is available to help you get started [here](https://www.markdownguide.org/cheat-sheet/).
:::

## Styling

By default, the HTML generated from Markdown is not styled, but you can easily customize it using CSS and Tailwind.

1. Navigate to ```src/app.css```.
2. Under the blog post styling section, you can add styles for all generated HTML. We provide the following minimal styling as a starting point:

```css
.post {
  @apply mt-10;

  h1 {
    @apply text-4xl font-bold
  }
  h2 {
    @apply text-3xl font-bold
  }
  h3 {
    @apply text-2xl font-semibold
  }
  h4 {
    @apply text-xl font-semibold
  }
  p {
    @apply my-3
  }
  pre {
    @apply text-muted-foreground bg-muted rounded-md p-2
  }
 }
```

## Links

- [Markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/)