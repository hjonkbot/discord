const fs = require("fs");

const directory = "./assets/sounds/honk/";

exports.run = (client, message, args) => {
	let voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return message.reply("voic chanel pls");

	if (client.playing.has(message.guild.id)) return;
	client.playing.add(message.guild.id);

	voiceChannel
		.join()
		.then((connection) => {
			fs.readdir(directory, (err, files) => {
				if (err) return console.error(err);
				let sound = files[Math.floor(Math.random() * files.length)];

				const dispatcher = connection.play(directory + sound);
				message.channel.send("hjönk");
				dispatcher.on("speaking", (speaking) => {
					if (speaking === 0) {
						voiceChannel.leave();
						return client.playing.delete(message.guild.id);
					}
				});
			});
		})
		.catch((err) => console.log(err));
};

exports.help = {
	name: "hjonk",
	description: "Play the honk sound.",
	usage: "hjonk",
};
