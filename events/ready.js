const statuses = require("../assets/statuses.json");
const packageFile = require("../package.json");

module.exports = (client) => {
	console.log(`\n             hjönk v${packageFile.version}\n`);
	console.log(
		`Goos has hjönked, with ${client.users.cache.size} hjönkers, in ${client.channels.cache.size} hjönkels of ${client.guilds.cache.size} hjönks.`
	);
	console.log(`Hjönked in as ${client.user.tag} [ID: ${client.user.id}]\n`);

	client.user.setActivity("hjönk", { type: "PLAYING" });

	let i = 0;
	setInterval(function () {
		if (i > statuses.length - 1) i = 0;
		client.user.setActivity(statuses[i], { type: "PLAYING" });
		i++;
	}, 60000);
};
