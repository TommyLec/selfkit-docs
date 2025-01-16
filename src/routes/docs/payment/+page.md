---
lastUpdate: 12/01/2025
---

# Payments

**SelfKit** provide webhooks to handle Paddle's event.

Paddle, a merchant of record (MoR). They provide payment processing, tax compliance, subscription management, and fraud protection.

:::info
Paddle is specificaly suited for **Digital Products**, you can check which business is allowed [here](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle)
:::

## Why paddle ?

Paddle simplifies selling digital products by acting as MoR, handling taxes (like VAT for EU residents), compliance, invoicing, and chargebacks. Paddle also assumes liability for compliance and audits, whereas payment processor like Stripe places this responsibility on you. This makes Paddle a more streamlined, cost-effective option for businesses looking to reduce administrative and legal burdens.

## Prerequisites

- For dev and local development:
    - Create an account on [Paddle sandbox](https://sandbox-vendors.paddle.com/)
- For production:
    1. Create an account on [Paddle](https://vendors.paddle.com/)
    2. Proceed Website and Identity verification.

## Setup

### Create notifications

First we need to enable Paddle notification in order to receive event in your app

1. Log in to your Paddle dashboard corresponding to your environment (e.g., production or sandbox).
2. On the right panel, go to ```Developer Tools > Notifications```.
3. Set up a new webhook to handle subscription-related events:
    - **Description**: Subscriptions
    - **Notification type**: Webhook 
    - **URL**: ```https://YOUR-DOMAIN/payment/paddle```
    - **Usage type**: Platform Only
    - **Events**:
        - ```subscriptions.created```
        - ```subscriptions.updated```
4. Then add the destination to handle products and pricing:
    - **Description**: Price and products
    - **Notification type**: Webhook 
    - **URL**: ```https://YOUR-DOMAIN/payment/paddle/products```
    - **Usage type**: Platform Only
    - **Events**:
        - ```product.created```
        - ```product.updated```
        - ```price.created```
        - ```price.updated```
5. For each destination, open its settings and locate the Secret Key section. Copy the secret keys and use them to populate the following fields in your ```.env``` file:
    - ```PADDLE_SUBSCRIPTION_WEBHOOK_KEY``` with Subscriptions webhook secret
    - ```PADDLE_PRODUCTS_WEBHOOK_KEY``` with Price and products webhook secret
    :::note
    If you are self-hosting your application with Coolify, there’s no need to populate the ```.env``` file manually. Simply add the secrets directly in Coolify under the Environment Variables section. For more details, refer to the [tutorial](/docs/coolify).
    :::
<br>

### Get Paddle key and token

In order to make api call and create checkout, we need an Api key and a client-side tokens, you can easily get them by following those steps:
1. In your Paddle dashboard, go to ```Developer Tools > Authentication```.
2. If no default key exists, click on **Generate API Key**.
3. Next, click on **Generate client-side token**.
4. Populate the following fields in your ```.env``` file:
    - ```PADDLE_API_KEY```
    - ```PUBLIC_PADDLE_CLIENT_TOKEN```
    
    If you are using Coolify, add these values directly in the Environment Variables section instead of modifying the ```.env``` file.

### Configuration for local development

In a local environment, you usually can't receive Paddle notifications directly on your localhost. To solve this, you can use Hookdeck. Here's how to set it up:

1. Run the following command to install the Hookdeck CLI globally: 
```npm install hookdeck-cli -g```
2. Run the following commands to create listeners for Paddle events: 
    - ```hookdeck listen 5173 paddle-products --path /payment/paddle/products```
    - ```hookdeck listen 5173 paddle --path /payment/paddle```
3. For each command, a terminal window will open displaying a "Source URL" (see image below). Replace the notification URL in the Paddle dashboard with the provided Source URL from the terminal.
<img src="../hookdeck-cmd.png" />

4. Your app is now configured to receive Paddle events in your local environment!

## Add products and prices

Now you app can receive Paddle's event, let's add Product and Price:

1. In your Paddle dashboard, navigate to ```Catalog > Products``` using the right panel.
2. Click on **New Product** to create a new product.
3. Select the newly created product, then click on **New Price** and complete the form.
    :::note
    Pay close attention to the product quantity limit. In most cases, you’ll want to set the maximum quantity to ```1``` to prevent customers from accidentally purchasing the same subscription or one-time product multiple times.
    :::
4. Your app should now have a new product and product variant (i.e. Paddle product price) created in the database.

## Paddle webhooks handling

Our API listens to Paddle events to update the database accordingly. Here is an overview of how it handles Products, Prices, and Subscriptions:

### Products

Each time a product is created or updated in Paddle, SelfKit will create or update it in the database.
However, a product alone does nothing in the application; it must have an associated product variant.

### Price

In Paddle, a price is equivalent to a product variant in **SelfKit**. If a price is sent to the application but the corresponding product is not found in the database, the webhook will automatically add the product.
A product variant can represent either a one-time product or a subscription product. The ```billing_period``` attribute determines the distinction.

### Subscriptions

When a payment is validated by Paddle, our webhook adds a new subscription to the database. Each subscription references a user and a product variant.

**Key Points:**
- The webhook does not create users; the user must already exist in the database.
- The webhook links the subscription to the user by their email address.
- A subscription can have one of the following statuses:
    - ```active```
    - ```canceled```
    - ```past_due```
    - ```paused```
    - ```trialing```
- Typically, a user can access the application only if their subscription status is ```active```, ```paused```, or ```trialing```.

    :::note
    For security reasons, users are required to authenticate before making a payment by default.
    To disable this protection, remove the redirection logic in the ```pricing.svelte``` component and modify the webhook in ```src/routes/payment/paddle/+server.ts```.
    :::

:::info
You can check webhooks code in:
- ```src/routes/payment/paddle/+server.ts``` for Subscriptions
- ```src/routes/payment/paddle/products/+server.ts``` for Products and prices

Also all database schemas are located in ```src/lib/server/database/schemas```.
:::
## Links

- [Paddle documentations](https://developer.paddle.com/)
- [Hookdeck for Paddle](https://hookdeck.com/webhooks/platforms/how-to-test-and-replay-paddle-webhooks-events-on-localhost-with-hookdeck)