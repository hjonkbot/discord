const Discord = require("discord.js");
const fs = require("fs");

const directory = "./assets/sounds/honk/";

exports.run = (client, message, args) => {
	let voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return message.reply("JOIN A HJONKING VOICE CHANNEL");

	voiceChannel
		.join()
		.then(connection => {
			fs.readdir(directory, (err, files) => {
				if (err) return console.error(err);
				let sound = files[Math.floor(Math.random() * files.length)];

				const dispatcher = connection.play(directory + sound);
				dispatcher.on("speaking", speaking => {
					if (speaking === 0) return voiceChannel.leave();
				});
			});
		})
		.catch(err => console.log(err));
};

exports.help = {
	name: "play",
	description: "Play the honk sound.",
	usage: "play",
};
