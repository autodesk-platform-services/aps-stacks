# APS-stacks

![Node.js](https://img.shields.io/badge/node-%3E%3D%2010.0.0-brightgreen.svg)
![Platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Viewer](https://img.shields.io/badge/Viewer-v7-green.svg)](http://developer.autodesk.com/)
[![oAuth2](https://img.shields.io/badge/oAuth2-v2-green.svg)](http://developer.autodesk.com/)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v2-green.svg)](http://developer.autodesk.com/)
[![OSS](https://img.shields.io/badge/OSS-v2-green.svg)](http://developer.autodesk.com/)
[![Model-Derivative](https://img.shields.io/badge/Model%20Derivative-v2-green.svg)](http://developer.autodesk.com/)

![thumbnail](https://raw.githubusercontent.com/autodesk-platform-services/aps-stacks/master/thumbnail.gif)

# Description

This is a experimental project with the idea of adding APS viewer and related UI components dynamically into the webpage.
Under the hood it uses [gridstack](https://gridstackjs.com/) our other sample https://github.com/cyrillef/node-red-node-APS uses UI components to simulate APS APIs, this sample is to simulate new UI components on a model.

# How it works

This sample is built on top of our basic [APS Tutorial](https://tutorials.autodesk.io). Unique thing about this poject is mostly in [GridStack.js](https://github.com/autodesk-platform-services/aps-stacks/blob/master/public/js/GridStack.js).
Each stack has it's own array, which consists of basic data like default URN, defaut property, associated functions etc.

# Setup

To use this sample, you will need Autodesk developer credentials. Visit the [APS Developer Portal](https://aps.autodesk.com), sign up for an account, then [create an app](https://aps.autodesk.com/myapps/create). For this new app, use **http://localhost:3000/api/aps/callback/oauth** as the Callback URL, although it is not used on a 2-legged flow. Finally, take note of the **Client ID** and **Client Secret**.

### Run locally

Install [NodeJS](https://nodejs.org).

Clone this project or download it. It's recommended to install [GitHub Desktop](https://desktop.github.com/). To clone it via command line, use the following (**Terminal** on MacOSX/Linux, **Git Shell** on Windows):

    git clone https://github.com/autodesk-platform-services/APS-stacks.git
    

To run it, have the urn ready and replace it in [GridStack.js](https://github.com/autodesk-platform-services/aps-stacks/blob/master/public/js/GridStack.js#L5), install the required packages, set the enviroment variables with your client ID & Secret and finally start it. Via command line, navigate to the folder where this repository was cloned to and use the following commands:

Mac OSX/Linux (Terminal)

    npm install
    export APS_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    export APS_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    npm start

Windows (use **Node.js command line** from the Start menu)

    npm install
    set APS_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    set APS_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    npm start

Open the browser: [http://localhost:3000](http://localhost:3000).

# Steps to add new stacks
Adding a new stack is very simple, you can use the given boilerplate stack as an example.

## Step 1
Add the new stack details in the form of an object inside [stacks.json](https://github.com/autodesk-platform-services/aps-stacks/blob/master/public/js/stacks.json)

## Step 2
Create a folder inside stacks folder by your stack name and place the js files,include all the logic including creating new UI elements in these js files, then include these files in index.html file.

## Step 3(Optional)
A default container will be created for your stack, in case you want to inject html attributes, you can add your template code in [getContent](https://github.com/autodesk-platform-services/aps-stacks/blob/master/public/js/GridStack.js#L35) function's switch case.

## Packages used

The [Autodesk APS](https://www.npmjs.com/package/APS-apis) packages are included by default. Some other non-Autodesk packages are used, including [express](https://www.npmjs.com/package/express).

# Tips & tricks

For local development/ testing, consider using the [nodemon](https://www.npmjs.com/package/nodemon) package, which auto-restarts your node application after any modification to your code. To install it, use:

    sudo npm install -g nodemon

Then, instead of **npm run dev**, use the following:

    npm run nodemon

Which executes **nodemon server.js --ignore www/**, where the **--ignore** parameter indicates that the app should not restart if files under the **www** folder are modified.

## Troubleshooting

After installing GitHub Desktop for Windows, on the Git Shell, if you see the ***error setting certificate verify locations*** error, then use the following command:

    git config --global http.sslverify "false"

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.

## Written by

Varun Patil [@varunpatil578](https://twitter.com/varunpatil578), [APS Partner Development](http://APS.autodesk.com)
