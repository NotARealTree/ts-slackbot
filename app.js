/**
 * Created by FrancisScreene on 29/10/2016.
 */

const TeamSpeakClient = require("node-teamspeak");
const util = require("util");
const config = require("./config");
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var client = new TeamSpeakClient(config.teamspeak.serverip);

console.log("Running in container");

var token = config.slack.token;

var rtm = new RtmClient(token, {logLevel: 'info'});
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var user = rtm.dataStore.getUserById(message.user);

    if(!message.text.includes(config.slack.botId) || !message.text.toLowerCase().includes('who')){
        return;
    }

    client.send("login", {client_login_name: config.teamspeak.username, client_login_password: config.teamspeak.password}, function(err, response, rawResponse){
        client.send("use", {sid: 1}, function(err, response, rawResponse){
            client.send("clientlist", function(err, response, rawResponse){
                var response = util.inspect(response);
                response = response.replace(/(['"])?([a-zA-Z_]+)(['"])?:/g, '"$2":');
                response = response.replace(/'/g, '"');
                var parsedResponse = JSON.parse(response);
                rtm.sendMessage('<@' + user.name + '>: ' + parseTeamspeakResponse(parsedResponse), message.channel);
            });
        });
    });
});

function parseTeamspeakResponse(response){
    var filteredResponse = response.filter(entry => {
        return entry.client_type == 0;
    });

    var result = '';

    switch(filteredResponse.length){
        case 0:
            result += 'There is no one on Teamspeak right now.';
            break;
        case 1:
            result += 'There is one person on Teamspeak right now.';
            break;
        default:
            result += 'There are ' + filteredResponse.length + ' people on Teamspeak right now.';
            break;
    }

    filteredResponse.forEach(entry => {
        result += '\n' + entry.client_nickname;
    });
    return result;
}


