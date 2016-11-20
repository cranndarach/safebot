const botkit = require('botkit');
const fs = require('fs');

try {
    // console.log(process.cwd());
    // console.log(__dirname);
    var tokens = require(__dirname + "/tokens.js");
} catch (err) {
    try {
        var tokens = require(__dirname + "../tokens.js");
    } catch (err2) {
        var tokens = {botToken: process.env.BOT_KEY};
    }
}

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

// Receives a help request
controller.hears('help', ['direct_message', 'mention', 'direct_mention'], (bot, message) => {
    bot.reply(message, `Send a direct message to me, <@safebot>, with your command.
        - \`tell #channel1 a message\`: I will say \`a message\` to #channel1
        - \`migrate #channel1 #channel2\`: I will post \`<- #channel2\` in #channel1
  Make sure to \`/invite\` me to any channel you want me to post to!`);
});

// To emhasize appreciation and promote a nice atmosphere
controller.hears(["[tT]hank(.*)", "[sS]orry(.*)"], ['mention', 'direct_mention'], (bot, message) => {
    console.log(message);
    bot.reply(message, "Thank you for understanding! :sparkles:");
});

// Receives a DM that it finds confusing
controller.on(['direct_message', 'mention', 'direct_mention'], (bot, message) => {
    console.log(message);
    botlog(message);
    bot.reply(message, `I heard \`${message.text}\`, but I don't know what that means. Try sending \`help\` for usage information.`);
});


///////////
// Utils //
///////////

// Saves the received message object to the log file (not in perfect JSON)
function botlog(message) {
    var logPath = __dirname + "/safebot.log";
    var user = message.user;
    var ts = parseInt(message.ts.split(".")[0]);
    var time = new Date(ts * 1000);
    console.log(`time: ${time}`);
    fs.appendFile(logPath, `[${user} @ ${time}]: ${message.text}\n`, (err) => {
        if (err) {
            console.log(`Could not find ${logPath}`);
            return;
        }
        console.log(`Wrote message to ${logPath}`);
    });
    // fs.appendFile(logPath, `, ${JSON.stringify(message)}`, (err) => {
    //     if (err) {
    //         console.log(`Could not find ${logPath}`);
    //         return;
    //     }
    //     console.log(`Wrote message to ${logPath}`);
    // });
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
