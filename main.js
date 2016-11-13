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
    bot.reply(message, `I heard \`${message.text}\``);
})
