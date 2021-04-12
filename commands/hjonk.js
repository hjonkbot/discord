const fs = require("fs");

const directory = "./assets/sounds/honk/";

exports.run = (client, message, args) => {
	let voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return message.reply("voic chanel pls");

	let repeat = 1;
	if (args[0] && args[0] > 1 && args[0] < 30) repeat = args[0];

	if (client.playing.has(message.guild.id)) return;
	client.playing.add(message.guild.id);

	voiceChannel
		.join()
		.then((connection) => {
			fs.readdir(directory, (err, files) => {
				if (err) return console.error(err);
				let sound = files[Math.floor(Math.random() * files.length)];

				message.channel.send("hjönk");
				if (repeat > 1) {
					const honkOnRepeat = () => {
						const dispatcher = connection.play(directory + sound);
						dispatcher.on("speaking", (speaking) => {
							if (speaking === 0) {
								if (repeat <= 1) {
									voiceChannel.leave();
									return client.playing.delete(message.guild.id);
								} else {
									repeat--;
									return honkOnRepeat();
								}
							}
						});
					};
					honkOnRepeat();
				} else {
					const dispatcher = connection.play(directory + sound);
					dispatcher.on("speaking", (speaking) => {
						if (speaking === 0) {
							voiceChannel.leave();
							return client.playing.delete(message.guild.id);
						}
					});
				}
			});
		})
		.catch((err) => console.log(err));
};

exports.help = {
	name: "hjonk",
	description:
		"Play the honk sound. You can set the amount of hjonks, or leave the argument blank to play it just once. The maximum amount is 30.",
	usage: "hjonk [amount]",
};
