---
lastUpdate: 12/01/2025
---

# Database

**SelfKit** use PostgreSQL for database and Drizzle ORM for building query and manage migrations.

## Setup

No specific setup is required for the database. The first time you run the ```docker-compose up``` command, an initialization script will execute on the database, creating the following tables:
- ```user``` An user register in your app.
- ```session``` An authenticated user session.
- ```email_verification_request``` The code for the email verification.
- ```password_reset_session``` The code for the password reset.
- ```totp_credential``` The TOTP key associated with a user who has enabled two-factor authentication (2FA).
- ```passkey_credential``` The Passkey key associated with a user.
- ```security_key_credential``` The Security key associated with a user.
- ```product``` A product added in your payment processor.
- ```product_variant``` A product variant added in your payment processor.
- ```subscription``` The subscription detail of an user.

:::note
The initialization script can be found under the ```/migrations/init``` folder.
:::

## How to access to the database?

### For local development

You can easily access to the database using Drizzle ORM:
1. Run this command: ```npx drizzle-kit studio```.
2. Then you can visualize the database on ```https://local.drizzle.studio```

### For production

In production you can use tools like [DBeaver](https://dbeaver.io/).
The connection settings should be something like this:
- **Host**: YOUR_VPS_IP
- **Port**: 5432
- **Database**: postgres
- **User name**: postgres
- **Password**: password

:::warning
It's HIGHLY recommanded to modify the default user name and password before deploying your app, you can do it in the ```docker-compose.yaml``` file OR directly in coolify (if you using it) before the first deploy.
:::

## How to modify the database?

With Drizzle ORM you can define SQL schema directly using  Typescript. All schema **must** be located in the ``` src/lib/server/database/schemas ``` folder.

To properly add or modify a table, follow these steps:
1. Make your modifications or add a new schema inside the ```schemas``` folder.
2. Run the following command: ```npx drizzle-kit generate```
3. Apply the changes by running: ```npx drizzle-kit migrate```

:::note
When using Docker Compose in production, the ```npx drizzle-kit migrate``` command is automatically executed before deployment. For a smooth workflow, follow these steps:
1. Make your modifications in the local environment.
2. Apply the changes locally to verify that the migration works correctly.
3. Push your changes to deploy the updates in production.
:::


## Links

[Drizzle ORM](https://orm.drizzle.team/docs/overview)