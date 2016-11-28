# @safebot

>Slack bot that shares your messages with your team, anonymously.

## To build

```sh
git clone https://github.com/cranndarach/safebot/tree/docker
cd safebot
docker build -t <YOUR_USERNAME>/safebot .
```

## To run

First, set up a [bot user](https://api.slack.com/bot-users) on your team and get an API token from Slack. Make sure to `/invite` safebot to any channel where it might be used!

```sh
docker run [-p <YOUR_PREFERRED_PORT>:8080] -d -e BOT_TOKEN=<YOUR_BOT_TOKEN> <YOUR_USERNAME>/safebot
```

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

## To-do:

* Automatically add safebot to existing and future channels
* Log usernames instead of user IDs
* Functionality to keep a list of requested content warnings, and a specific command for `cw`s

## License info

This project is distributed under the terms of the MIT license, copyright 2016 R Steiner
