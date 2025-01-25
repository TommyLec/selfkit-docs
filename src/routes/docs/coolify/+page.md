---
lastUpdate: 15/01/2025
---

# Deploy on Coolify

**SelfKit** is designed with self-hosting in mind, and we highly recommend using Coolify to deploy and manage your application.

We will explain how to connect your private GitHub repository to Coolify. This integration ensures that each time you push new code to a specific branch, Coolify will automatically update the deployed application.

This tutorial won't cover Coolify installation, as they already provide excellent documentation: 
[Coolify - Installation](https://coolify.io/docs/installation).

## Prerequisites

- A server with Coolify installed
- A private github repository with your app made with **SelfKit**

## Install your app on Coolify

### Link Github to Coolify
First, we need to add a new Source on Coolify. Follow these steps:
1. In your Coolify instance, click on ```Sources``` in the left panel.
2. Click on ```+ Add``` and then click ```Continue```.
3. Click on ```Register Now```, connect your GitHub account, and create the new app.
4. You should be redirected to Coolify. Here, click on ```Install repositories on GitHub``` to select which repositories you want to use (or select all).

### Quick setup (Recommended)

**SelfKit** comes with a ```coolify_deploy.sh``` script to easily deploy your app on Coolify. It will:
- Create a new project on Coolify
- Add services to the new project
- Add the app to the new project
- Add environment variables to the app
- Deploy the app

:::note
You need to have ```jq``` and ```openssl``` installed on your computer:
- Windows: ```choco install jq```
- Linux: ```sudo apt-get install jq```
- MacOS: ```brew install jq```
:::

1. Enable Coolify API and create a new API token with the ```write```, ```deploy```, ```read:sensitive``` permissions.
2. In the ``` deployment ``` folder, rename .env.example to .env and fill all fields.
3. In your terminal, run ``` ./deployment/coolify_deploy.sh```.
4. Your app is now set up on Coolify!


### Setup with docker-compose
Now, you can add your app to Coolify:
1. Click on Project in the left panel and create a new project.
2. Inside your new project, click on ```+ New``` to create a new resource.
3. Choose ```Private Repository (with GitHub App)``` (it should be the second option).
4. Select the app you created earlier and load the corresponding repository.
5. Choose the branch you want to deploy (usually main), and under **Build Pack**, select **Docker Compose**.
6. Click ```Continue```.
7. In the left panel, click on ```Environment Variables``` and fill in all mandatory fields (highlighted in red). Here’s a quick overview:
    - ```POSTGRES_PASSWORD```, ```UMAMI_POSTGRES_PASSWORD```, ```PLUNK_DB_PASSWORD```: We recommend using a unique password for each one for security purposes.
    - ```DB_CONNECTION_STRING```, ```UMAMI_DB_URL```, ```PLUNK_DB_URL```: These are the connection strings for each PostgreSQL database. Replace [PASSWORD] in the string with the corresponding password you set earlier.
    - ```ENCRYPTION_KEY```: This is used for authentication and must be a Base64-encoded key. You can generate one with the following command: 
    ```bash 
    openssl rand -base64 32
    ```
    :::warning
    After the initial deployment, you cannot change the user/password for each database without deleting the associated docker container.
    :::

    :::note
    All other variables are not mandatory for launching the application but may cause certain features to break if left empty.
    :::
8. Your app is now set up on Coolify!

You can now click on Deploy. Coolify will automatically use the Docker Compose file to launch all the services. The process may take a few minutes to complete the first time.
Coolify will generate domain associated to your main app, [Umami](/docs/analytics) and [Plunk](/docs/email).

