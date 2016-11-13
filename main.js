const tokens = require(__dirname + "/tokens.js");
const botkit = require('botkit');
const fs = require('fs');

// Create bot
const controller = botkit.slackbot();
controller.spawn({
  token: tokens.botToken
}).startRTM();

// Receives a DM in the format "tell #code install gentoo"
controller.hears("[tT]ell <#([^\s]*)> (.*)", ['direct_message'], (bot, message) => {
    var channl = message.match[1]
    var channlID = splitChannel(channl).id;
    var msg = message.match[2];
    console.log(`I heard \`${message.text}\``);
    botlog(message);
    bot.startConversation({channel: channlID}, (err, convo) => {
        if (err) {
            console.log(err.stack);
        }
        convo.say(`${msg}`);
        bot.reply(message, `I told <#${channl}> \`${msg}\``);
    });
});

// Receives a DM in the format "migrate #general #meta"
controller.hears("[mM]igrate <#([^\s]*)> <#([^\s]*)>", ['direct_message'], (bot, message) => {
    var from_ = message.match[1];
    var fromID = splitChannel(from_).id;
    console.log(`I heard \`${message.text}\``);
    var to_ = message.match[2];
    botlog(message);
    bot.startConversation({channel: fromID}, (err, convo) => {
        if (err) {
            console.log(err.stack);
        }
        convo.say(`<- <#${to_}>`);
        bot.reply(message, `I told <#${from_}> to migrate to <#${to_}>`);
    });
});

// Receives a DM that it finds confusing
controller.on('direct_message', (bot, message) => {
    console.log(message);
    botlog(message);
    bot.reply(message, `I heard \`${message.text}\`, but I don't know what that means.`);
});

// To emhasize appreciation and promote a nice atmosphere
controller.hears(["[tT]hank(.*)", "[sS]orry(.*)"], ['mention', 'direct_mention'], (bot, message) => {
    console.log(message);
    bot.reply(message, "Thank you for understanding! :sparkles:");
});


///////////
// Utils //
///////////

// Saves the received message object to the log file (not in perfect JSON)
function botlog(message) {
    var logPath = __dirname + "/safebot.log";
    fs.appendFile(logPath, `, ${JSON.stringify(message)}`, (err) => {
        if (err) {
            console.log(`Could not find ${logPath}`);
            return;
        }
        console.log(`Wrote message to ${logPath}`);
    });
}

// Channel links in messages are in the format "<#IDSTRING|name>"
// This splits them into the id and the name, saves to an object
function splitChannel(channelString) {
    // input in the form of "ID|name"
    var channelSpl = channelString.split("|");
    var channl = {
        id: channelSpl[0],
        name: channelSpl[1]
    };
    return channl;
}
