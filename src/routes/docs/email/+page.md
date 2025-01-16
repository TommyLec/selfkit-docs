---
lastUpdate: 15/01/2025
---

# Email

**Selfkit** uses Plunk to deliver transactional and marketing emails.

## Why Plunk ?

Plunk is a self-hosted, open-source email solution that aligns with SelfKit's focus on minimizing external dependencies and costs. It offers robust email delivery while ensuring greater control, privacy, and affordability compared to services like Resend or Mailgun.

## Prerequisites

- A Plunk instance (We recommand to follow our [Coolify tutorial](/docs/coolify) to self-host SelfKit).
- A Plunk account (you can directly create it on your self-host Plunk instance).
- A custom domain.

## Setup

Plunk rely on AWS SES to deliver mails. So you have to an active AWS account with SES enabled.

:::info
Emails rely on reputation to function effectively (e.g., avoiding being flagged as spam). Most solutions, like Resend, rely on AWS SES for this because it is cost-efficient. We strongly advise against self-hosting this component to avoid the burden of heavy maintenance.
:::

1. Follow the [Plunk guide](https://docs.useplunk.com/getting-started/self-hosting) to set up your AWS SES account (you can skip the Docker Compose section).
2. Next, follow this [AWS SES guide](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html#mail-from-set) to configure your custom MAIL FROM domain.
3. On your Plunk instance, go to ```Project Settings > Verified Domain``` and enter an email address with your domain, for example: ```teams@YOUR_DOMAIN.com```.
4. Refresh the page, and your domain should appear as verified. If not, double-check step 2.
5. Your Plunk instance is ready!

:::note
You can use this Plunk instance for other applications as well. Simply create another project within Plunk and link a different domain.
:::

## Send emails

**SelfKit** provide an ```EmailService``` to send emails. Here is an example of how to use it:

```javascript
import { EmailService } from '$lib/server/email/emailService';

const { error } = await EmailService.send({
	from: 'teams@mysaas.com',
	to: 'john.doe@customer.com',
	subject: 'Thanks!',
	body: 'Thanks you for your purchase!'
});

if (error) {
    console.log(error);
}
```

## Track events

You can also track some events to set up automation in your Plunk dashboard:

```javascript
import { EmailService } from '$lib/server/email/emailService';

if (customer.marketingConsent) {
	await EmailService.track('Product purchase', customer.email, true);
}
```

For more informations, check the [Plunk documentation](https://docs.useplunk.com/guides/setting-up-automation).

:::note
By default **SelfKit** only track a ```Product purchase event``` when a customer purchases a product and accepts the marketing consent.
:::

## How to use an other mail service ?

If you prefer not to go through these steps or rely on AWS SES, you can use any other email service. Simply modify the ```EmailService``` located at ```src/lib/server/email``` with the implementation of your mail service (via API or Library).

Also, if your rely on the ```docker-compose.yaml``` for deployment, remove the ```plunk```, ```postgres-plunk``` and ```redis``` container from it.

## Links

- [Plunk docs](https://docs.useplunk.com/getting-started/introduction)