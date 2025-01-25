---
lastUpdate: 11/01/2025
---

# Get started

<p class="text-xl">Welcome to <span class="font-bold">SelfKit</span> !<p>

Here's a quick overview of the boilerplate. Follow along to get your app up and running.

## Prerequisites

- Node v18.12 or higher
- pnpm installed 
    - If not, run this command: ``` npm install -g pnpm@latest-10 ```
- Docker Desktop ([Docs](https://docs.docker.com/desktop/))

## Start a local server

1. In your terminal, run the following commands:
```bash
git clone https://github.com/tomlec/selfkit.git [YOUR_APP_NAME]
cd [YOUR_APP_NAME]
git remote remove origin
docker-compose -f docker-compose.dev.yaml up
```
:::note
The ```docker-compose up``` command may take a few minutes to complete the first time it runs. 

If you prefer not to see the container logs in subsequent runs, you can add the ```--no-attach``` parameter.
:::

2. In another terminal, run the following commands:
```bash
pnpm install
pnpm run dev
```

3. Rename ``` .env.example ``` to ``` .env ```
```bash
mv .env.example .env
```

4. Open ``` http://localhost:5173 ``` to see your app.

:::note
If nothing appears, ensure that Docker is running and that the ```DB_CONNECTION_STRING``` environment variable points to the correct container (the PostgreSQL one).
:::

## Config file

The configuration file is located at ```src/lib/selfkit.config.js.``` Each key is thoroughly documented, so make sure to read it carefully and provide all the required information. **This file serves as the cornerstone of the application.**
