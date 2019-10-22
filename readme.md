# MOH-Bot

## Bot Server

This is a Bot server created to allow the bot to get Webex details of the bot

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

### Features

- `GET /room` returns a list of rooms the bot resides in.
- `POST /room` creates a room.

```json
{
  "title": "New Room Title"
}
```

- `DELETE /room` deletes a room.

```json
{
  "title": "Deleted Room Title"
}
```

- `POST /membership` adds a user into a room.

```json
{
  "title": "New Room Title",
  "email": "somebody@cisco.com"
}
```

- `DELETE /membership` removes a user from a room.

```json
{
  "title": "New Room Title",
  "email": "somebody@cisco.com"
}
```

- `POST /message/text` sends a text message into a room.

```json
{
  "title": "New Room Title",
  "text": "Is somebody there?"
}
```

- `POST /message/markdown` sends a [markdown message](https://dev-preview.webex.com/formatting-messages.html) into a room.

```json
{
  "title": "New Room Title",
  "text": "###Details### \n\nType **info** to show this again  \nDetail 1: *Something important*  \nDetail 2: Not too important"
}
```

## Botkit Starter Kit

This is a Botkit starter kit for webex, created with the [Yeoman generator](https://github.com/howdyai/botkit/tree/master/packages/generator-botkit#readme).

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

[Botkit Docs](https://botkit.ai/docs/v4)

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code).
Edit the samples, and add your own in the [features/](features/) folder.
