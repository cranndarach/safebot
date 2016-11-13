# @safebot

>Slack bot that shares your messages with your team, anonymously.

## To install

Requires node.js and npm

### Install via npm:

```sh
npm install safebot
```

### From source:

```sh
git clone https://github.com/cranndarach/safebot
cd safebot
npm install
```

## To set up and run

First, set up a [bot user](https://api.slack.com/bot-users) on your team and get an API token from Slack. Make sure to `/invite` safebot to any channel where it might be used!

Then, create a file in the project's root directory (`safebot/`) called `tokens.js` with the following code (replace "YOUR_API_TOKEN_HERE" with your API token)

```javascript
module.exports = {
    botToken: "YOUR_API_TOKEN_HERE"
};
```

Then start with

```sh
npm start
```

Hop over to your Slack and start messaging!

## Message commands

**Anonymous safebot messages work with direct messages.** That means that if you @mention safebot in a channel, that message will be posted to the channel.

### Ask a channel to migrate their conversation

```
migrate #from-here #to-there
```

Safebot will post in `#from-here`:

```
<- #to-there
```

### Send a channel an anonymous message

```
tell #channel i said hi
```

Safebot will post in `#channel`:

```
i said hi
```

## License info

This project is distributed under the terms of the MIT license, copyright 2016 R. Steiner
