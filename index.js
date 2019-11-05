const Discord = require('discord.js');
var config = require('./config.json')
const client = new Discord.Client();
var prefix = config.Prefix

client.on('ready', () => {
    console.log('pret !')
    client.user.setActivity("%help", { type: "WATCHING" });
});

client.on('message', async message => {
    let args = message.content.trim().split(/ +/g)

    if (message.content === prefix + 'ping') {
        console.log('commande ping par ' + message.author.tag)
        let time = Date.now();
        await message.channel.send("Pong !").then(async(m) => await m.edit(`Pong : ${Date.now() - time} ms`))
    }

    if (args[0].toLocaleLowerCase() === config.Prefix + 'repete') {
        console.log('commande %repete par ' + message.author.tag)
        say = args.slice(1).join(" ");
        if (!say) return message.reply('tu dois ecrir un mot ou une frase apres %repete')
        message.channel.send(say)
    }

    if (args[0].toLocaleLowerCase() === prefix + 'avatar') {
        let member = message.mentions.users.first()
        var embedAuthor = new Discord.RichEmbed()
            .setTitle("Voici ton avatar " + message.author.username + " :")
            .setImage(message.author.avatarURL)
        if (!member) return message.channel.send(embedAuthor)
        var embed = new Discord.RichEmbed()
            .setTitle("Voici l'avatar de " + member.username + " :")
            .setImage(member.displayAvatarURL)
        message.channel.send(embed)
    }

    if (message.content === prefix + "help") {
        var embedHelp = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setThumbnail(message.author.avatarURL)
            .setTitle("Panneau d'aide")
            .addField("__Commnde Diverse:__", "**" + prefix + "ping** -> Affiche la lantence du bot \n**" + prefix + "avatar [mention]** -> affiche l'avatar de la personne mentionnée \n **" + prefix + "repete [mot ou phrase]** -> repete le mot ou la frase desirée")
            .setTimestamp() // permet de get l'heure je crois ...
            .setFooter("Bot fait par LB", "https://cdn.discordapp.com/avatars/495683052152946708/a_9a41054830ead278cee8eeec3cde1be0.gif")
        message.channel.send(embedHelp)
    }
});
client.login(config.Token);
