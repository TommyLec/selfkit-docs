---
lastUpdate: 11/01/2025
---

# Analytics

**SelfKit** use Umami to manage analytics.

Umami is an open-source, privacy-focused web analytics tool and a great alternative to Google Analytics.

## Why Umami ?

Unlike other solutions, it does not require a cookie banner, as Umami neither collects nor stores personal data. It is fully compliant with GDPR and PECR regulations.

Designed to be easy to set up, Umami is also more lightweight than other options, such as Plausible, making it an excellent choice for self-hosting.

## Prerequisites

- An Umami instance (We recommand to follow our [Coolify tutorial](/docs/coolify) to self-host Umami).
- An Umami account, on your self-hoste Umami instance the default one is:
    - Username: **admin**
    - Password: **umami**
- Have your Website added in Umami ([documentation](https://umami.is/docs/add-a-website))

## How to track event ?

1. Get your tracker script ([documentation](https://umami.is/docs/collect-data))
2. Place the script in your **app.html** or in the root **+layout.svelte** :
    ```svelte title="app.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%sveltekit.assets%/selftkit.svg" />
            <meta name="viewport" content="width=device-width" />
            <script async src="http://localhost:5173/script.js" data-website-id="YOUR_WEBSITE_ID"></script> // [svp! ++]
            %sveltekit.head%
        </head>
        <body data-sveltekit-preload-data="hover">
            <div style="display: contents">%sveltekit.body%</div>
        </body>
    </html>
    ```
    Or
    ```svelte title="+layout.svelte"
    <!-- ... -->
    <svelte:head> // [svp! ++]
    <script async src="http://localhost:5173/script.js" data-website-id="YOUR_WEBSITE_ID"></script> // [svp! ++]
    </svelte:head> // [svp! ++]
    <!-- ... -->
    ```
:::note
In production the ```src``` should point to an ```https``` domain. If you use coolify, assign Umami to a custom domain or sub domain before adding the script.
:::

3. Add data property to track every events you want, **data-umami-event** is required. But you can also pass other data with the **data-umami-event-[name]** property
    ```svelte
    <button
        id="Create project"
        data-umami-event="Add project" // [svp! ++] 
        data-umami-event-projectname="Project 1" // [svp! ++]
        data-umami-event-date="01/11/2024" // [svp! ++]
        data-umami-event-otherproperty="Something" // [svp! ++]
    >
        Create
    </button>
    ```
More informations about event tracking in the [Official Umami Docs](https://umami.is/docs/track-events)

### Event already tracked

By default **SelfKit** already track those events :

1. **Login button** 

    Triggered when an user login (With email/password, provider or passkey)

    | Property | Value |
    | --- | --- |
    | Type | `Standard` `Google` `Passkey` |
2. **Signup button**

    Triggered when a new user Sign up (with email/password or provider)

    | Property | Value |
    | --- | --- |
    | Email | `user.email` |
    | Type | `Standard` `Google` |
3. **Purchase bubtton**

    Triggered when an user click on the Purchase button of a product (that does not mean that user buy the product).

    | Property | Value |
    | --- | --- |
    | Product | `product.name` |
    | Period | `variant.billingPeriod` |
    | Currency | `variant.currency` |

## Links

[Umami Docs](https://umami.is/docs)