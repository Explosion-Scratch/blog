---
title: "VSCode online: Is it possible?"
description: How I hosted a fully functional vscode online, in heroku, for free
category: VSCode, IDEs, Online, Self-hosting
createdAt: Sunday, January 2 2022, 7:33 AM
---

Hosting VSCode online, what a challenge! I thought this was going to be easier than it was, so let me explain to you guys what I did.

## Step 1: Deploy to heroku

Go over to the guide:

<LinkPreview url="https://github.com/coder/deploy-code-server/blob/main/guides/heroku.md"></LinkPreview>

Click this button:

![image](https://user-images.githubusercontent.com/61319150/147876844-55cc4fd9-a488-45f9-a19c-e439e0cbfdfc.png)

Set a name and password for the server:

![image](https://user-images.githubusercontent.com/61319150/147876882-9944183f-f437-4df5-b9a1-4963f607a70c.png)

Wait for it to build:

![image](https://user-images.githubusercontent.com/61319150/147876906-2696a39c-0add-4c60-9280-4b043da55aff.png)

## Step 2: Create a Git repo from their template

![image](https://user-images.githubusercontent.com/61319150/147877005-48e29252-849e-4f52-9f84-fa6a4527ea08.png)

Now hook it up with heroku by going to your app that you just created from the heroku dashboard, then to deploy, then click on GitHub, link your github account if needed and connect the github repo.

## Step 3: Configure rclone

This took me a bit to figure out, just run `rclone config`, then answer the questions. I choose google drive as my storage, then I made a new google cloud app to get a client id and secret for it, so that it worked smoother. Then, **this is important**, enable the Drive API. Otherwise you won't be able to push and pull to rclone.

You can enable the drive API here:

<LinkPreview url="https://developers.google.com/drive/api/v3/enable-drive-api"></LinkPreview>

Now base64 encode the config data and add it to a heroku env variable:

![image](https://user-images.githubusercontent.com/61319150/147877178-e5c8a5ef-f333-485e-a783-3bad9b5b6e67.png)

You should mostly just copy the non-blurred variables you see in that screenshot. Especially the rclone flags. (Also, to find the remote name to rclone list I think)

## Step 4: Customize ~~and save with liberty mutual~~

Now you need to customize your VSCode, and sorry, but the way to do that isn't just to open up your server and install stuff. Sorry! Instead you need to edit the `Dockerfile` of the repo you cloned. This is why you cloned that repo. Below is my total dockerfile if you want to copy it:

```dockerfile
# Start from the code-server Debian base image
FROM codercom/code-server:3.10.2

USER coder

# Apply VS Code settings
COPY deploy-container/settings.json .local/share/code-server/User/settings.json

# Use bash shell
ENV SHELL=/bin/bash

# Install unzip + rclone (support for remote filesystem)
RUN sudo apt-get update && sudo apt-get install unzip -y
RUN curl https://rclone.org/install.sh | sudo bash

# Copy rclone tasks to /tmp, to potentially be used
COPY deploy-container/rclone-tasks.json /tmp/rclone-tasks.json

# Fix permissions for code-server
RUN sudo chown -R coder:coder /home/coder/.local

# You can add custom software and dependencies for your environment below
# -----------

# MODIFICATIONS: Install extensions. Note that each extension requires `--install-extension [name]`.
RUN code-server --install-extension jakewilson.vscode-cdnjs --install-extension dbaeumer.vscode-eslint --install-extension teabyii.ayu --install-extension streetsidesoftware.code-spell-checker --install-extension cmstead.jsrefactor --install-extension ritwickdey.LiveServer --install-extension PKief.material-icon-theme --install-extension sdras.night-owl --install-extension esbenp.prettier-vscode --install-extension svelte.svelte-vscode --install-extension actboy168.tasks --install-extension bradlc.vscode-tailwindcss

# Install apt packages:
# RUN sudo apt-get install -y ubuntu-make

# MODIFICATIONS: Copy files to the shared folder. Then you can put files like `settings.json`, `snippets/javascript.json` and more.
COPY deploy-container/shared/ /home/coder/.local/share/code-server/User/

# -----------
# MODIFICATIONS: Changed node version to 16, installed node (which comes with npm), and yarn
RUN sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo bash -
RUN sudo apt-get install -y nodejs
RUN sudo npm i -g yarn

# Port
ENV PORT=8080

# Use our custom entrypoint script first
COPY deploy-container/entrypoint.sh /usr/bin/deploy-container-entrypoint.sh
ENTRYPOINT ["/usr/bin/deploy-container-entrypoint.sh"]
```

## Useful tips:

- If you want to access a port on your server it's `/proxy/PORT_NUMBER`.
- MAKE SURE TO PUSH AND PULL FREQUENTLY: If heroku shuts your app down due to inactivity for a bit then all of your data will be lost if you didn't push.
- Install as a PWA: It fixes so many of the keybindings, like Control + W.
