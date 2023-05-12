<p align="center">
  <a href="http://www.esprit.tn/"><img src="https://i.ibb.co/3TyDJtD/Education-ADO.png" alt="Education-ADO" border="0"></a>
  <h3 align="center">We Present to you: Learnly</h3>

  <p align="center">
   First 1on1 Education Platform
    <br>
    Base project made with much  :heart: . Contains CRUD, patterns, API's and much more!
    <br>
    <br>
    <a href="https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education/-/issues/new">Report bug</a>
    ·
    <a href="https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education/-/issues/new">Request feature</a>
  </p>
</p>

## Table of contents

- [Quick start](#quick-start)
- [What's included](#whats-included)
- [Demo](#demo)
- [Prerequisities](#Prerequisities)
- [Install](#install)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Quick start

This is an online education platform made with Node JS Express & MongoDB for database, Flutter for mobile version, Angular for web version, You should follow the instructions below in order to get the app running.

## What's included (Features)

- Splash Screen
- Create account
- Login
- OTP Verification upon SignUp
- OTP Verification upon Forgot Password
- Change your profile picture
- Change your password
- Switch between Teacher Mode/Learner Mode
- Subscribe / Unsubscribe to Newsletter (For promo mails & coupon codes)
- Payment using Paymee.tn gateway
- Upon payment Mail to learner for order summary and mail to teacher for notifiying
- Ability to view orders & order status for users
- Ability to add courses as teacher / edit & delete courses
- Ability to schedule a meet in-app for teachers (Also edit/delete added schedules with ability to notify users via mail) (Google Calendar API)
- Ability to chat with other members in-app (Socket IO) with messages saving in database and ability to delete all messages
- Push notifications upon receiving new message in Socket Io chat (From Node JS server Google API)
- Ability to report a problem / submit a feedback (Wiredash.io API)
- Ability to search for courses
- Ability to search for courses by category
- Ability to filter teacher courses
- Ability to rate course / add comments after you purchase
- Dialogflow Chatbot API (Smart chatbot to get answers for frequent questions (FAQ) )
- Shared prefs
- Custom animations (Loading and switching through screens)
- Pull to refresh teacher courses
- Custom Toast messages for input errors
- Ability to cashout once you reach minimum of 50 TND
- Custom UI with cool animations
- Custom floating action bar
- Custom Bottom Screen Nav bar
- Deployment of Node JS server in herokuapp
- All in-app forms have validations (custom)
- App is deployed in Microsoft AppCenter (For Auto update and build generation without passing through PlayStore)

* Following the [best practices](https://angular.io/guide/styleguide)!



## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
- MongoDB - [Download & Install MongoDB Compass](http://www.mongodb.org/downloads)
- Flutter SDK - [Download & Install Flutter SDK](https://flutter.dev/docs/development/tools/sdk/releases) 1.22.6 Used in this project.

## Install

**Installation Steps**:

```bash
# Step one: Clone this repo

git clone https://github.com/safwenbarhoumi/PIM2.git

# Using Docker
docker compose up -d
```

**Without Docker**:

```bash
# Normal usage

git clone https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education.git

# Open server folder and run
npm install

npm run dev

# Open app folder and run

npm install

ng serve --open

# For flutter app open MobileDev in VsCode

flutter build

flutter run
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education/-/issues/new) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education/-/issues/new).

## Contributing

Please read through our [contributing guidelines](https://gitlab.com/espritmobile-2021/1on1-education/1-on-1-education/-/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Creators :

**Firas Ben Abdallah**

**Safwen Barhoumi**

**Haythem Belhaj**

**Firas Maaouia**

**Abdesslem Chebili**


## Thanks

Thanks to all contributors and their support:

## Copyright and license

Code and documentation copyright 2021 the authors. Code released under the [Esprit Mobile Team](http://www.esprit.tn).

Enjoy :metal:
