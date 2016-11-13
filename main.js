const tokens = require(__dirname + "/tokens.js");
const botkit = require('botkit');
const fs = require('fs');

// Create bot
const controller = botkit.slackbot();
// var bot =
controller.spawn({
  token: tokens.botToken
}).startRTM();

// Start it up
// bot.startRTM(function(err, bot, payload) {
//   if (err) {
//     throw new Error('Could not connect to Slack');
//   }
// });

controller.hears("tell <#([^\s]*)> (.*)", ['direct_message'], (bot, message) => {
    // Receives a DM in the format "tell #code install gentoo"
    var channlStr = message.match[1];
    var channlSpl = channlStr.split("|");
    var channl = {
        id: channlSpl[0],
        name: channlSpl[1]
    };
    var msg = message.match[2];
    console.log(`I heard \`${message.text}\``);
    botlog(message);
    bot.startConversation({channel: channl.id}, (err, convo) => {
        if (err) {
            bot.botkit.log(err);
        }
        convo.say(`${msg}`);
        bot.reply(message, `I told <#${channlStr}> \`${msg}\``);
    });
});

controller.on('direct_message', (bot, message) => {
    // console.log(bot);
    console.log(message);
    bot.reply(message, `I heard \`${message.text}\`, but I don't know what that means.`);
})

function botlog(message) {
    var logPath = __dirname + "/safebot.log";
    fs.appendFile(logPath, `, ${JSON.stringify(message)}`, (err) => {
        if (err) {
            console.log(`Could not find ${logPath}`);
            return;  //. Will create it.`);
            // fs.writeFile(logPath, JSON.stringify(message), (err) => {
            //     if (err) {
            //         console.log(err.stack);
            //         return;
            //     }
            // });
        }
        console.log(`Wrote message to ${logPath}`);
    });
}
