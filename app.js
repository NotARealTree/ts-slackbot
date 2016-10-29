/**
 * Created by FrancisScreene on 29/10/2016.
 */

const TeamSpeakClient = require("node-teamspeak");
const util = require("util");
const config = require("./config");

console.log("Running in container");

var client = new TeamSpeakClient(config.teamspeak.serverip);
client.send("login", {client_login_name: config.teamspeak.username, client_login_password: config.teamspeak.password}, function(err, response, rawResponse){
    client.send("use", {sid: 1}, function(err, response, rawResponse){
        client.send("clientlist", function(err, response, rawResponse){
            console.log(util.inspect(response));
        });
    });
});