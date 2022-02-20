const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const Snooper = require("reddit-snooper");
const snooper = new Snooper({
  // credential information is not needed for snooper.watcher
  username: process.env.username,
  password: process.env.password,
  app_id: process.env.id,
  api_secret: process.env.secret,
  user_agent: "OPTIONAL user agent for your bot",

  automatic_retries: true, // automatically handles condition when reddit says 'you are doing this too much'
  api_requests_per_minuite: 60, // api requests will be spread out in order to play nicely with Reddit
});
client.on("ready", () => {
  console.log(`${client.user.tag} is running `);
});
client.on("messageCreate", (message) => {
  const stuff = message.content
  snooper.api.post('/api/submit', {
   sr: "your subreddit here", kind: "self", text: `${stuff}`, title: `from ${message.author}`
  }, function(err, responseCode, responseData) {
    console.log(`${stuff}`)
    console.log(err)
    console.log(responseCode)
  })
  //console.log(`${user}`);
});
client.login(process.env.token);