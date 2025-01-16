---
lastUpdate: 15/01/2025
---

# SEO

## Setup

1. Open ```selfkit.config.js``` located at  ```src/lib``` and find the **App information** and **SEO** section. All values in these sections will be used as default for SEO meta tags, [Open graph](https://ogp.me/) and [JSON-LD](https://json-ld.org/).

2. To add custom SEO tags to a page (without rewritting everything), go to the ```+page.server.ts``` of a page you want to add tags.

3. Then in the load function, do this:

```ts
export const load: PageServerLoad = async () => {
	return {
		pageName: 'Contact Us',
		description: "Get in touch with our team.",
                keywords: ['Contact', 'SelfKit'],
                imgUrl: 'https://example.ie/mywebsite', // For Open graph, the image is display for twitter card and facebook
                imgAlt: 'My website'
	};
};

```
:::note
All parameters are optional, but I recommand to at least fill ```pageName``` and ```description```. 
:::