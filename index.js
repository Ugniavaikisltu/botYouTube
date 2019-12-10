const Discord = require('discord.js');
var config = require('./config.json')
const client = new Discord.Client();
const fs = require('fs')
let xp = JSON.parse(fs.readFileSync('./xp.json', 'utf8'))
var prefix = config.Prefix

client.on('ready', () => {
    console.log('pret !')
    client.user.setActivity("%help", { type: "WATCHING" });
});

client.on("guildMemberAdd", member => {
    var embed = new Discord.RichEmbed()
        .setColor("#2eff00")
        .setTitle("Bienvenue !")
        .setDescription("Bievenue " + member + " !")
    member.guild.channels.get("634477535001968650").send(embed)
})

client.on('message', async message => {
    let args = message.content.trim().split(/ +/g)

    // ping
    if (message.content === prefix + 'ping') {
        console.log('commande ping par ' + message.author.tag)
        let time = Date.now();
        await message.channel.send("Pong !").then(async (m) => await m.edit(`Pong : ${Date.now() - time} ms`))
    }

    //repete
    if (args[0].toLocaleLowerCase() === config.Prefix + 'repete') {
        console.log('commande %repete par ' + message.author.tag)
        say = args.slice(1).join(" ");
        if (!say) return message.reply('tu dois ecrir un mot ou une frase apres %repete')
        message.channel.send(say)
    }

    //avatar
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

    //help
    if (message.content === prefix + "help") {
        var embedHelp = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setThumbnail(message.author.avatarURL)
            .setTitle("Panneau d'aide")
            .addField("**__Commnde Diverse:__**", "**" + prefix + "ping** -> Affiche la lantence du bot \n**" + prefix + "avatar [mention]** -> affiche l'avatar de la personne mentionnée \n **" + prefix + "repete [mot ou phrase]** -> repete le mot ou la frase desirée")
            .addField("**__Commande Status:__**", "**" + prefix + "stream** -> change le status du bot en *stream %help !* \n **" + prefix + "ecoute** -> change le status du bot en *ecoute %help !* \n **" + prefix + "regarde** -> change le status du bot en *regarde %help !*")
            .setTimestamp() // permet de get l'heure je crois ...
            .setFooter("Bot fait par LB", "https://cdn.discordapp.com/avatars/495683052152946708/a_9a41054830ead278cee8eeec3cde1be0.gif")
        message.channel.send(embedHelp)
    }

    //kick
    if (args[0].toLocaleLowerCase() === prefix + 'kick') {
        membre = message.mentions.members.first()
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(message.author.username + ", tu n'as pas la permission de kick des membres `KICK MEMBERS` !")
        if (!membre) return message.channel.send(message.author.username + ", tu dois mentioné quelqu'un !")
        if (membre.hasPermission("ADMINISTRATOR")) return message.channel.send(message.author.username + ", tu ne peut pas kick cette personne !")
        message.guild.member(membre).kick(membre)
        message.channel.send("✅ " + membre + " a ete kick")
    }

    //ban
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
        membre = message.mentions.members.first()
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(message.author.username + ", tu n'as pas la permission de BAN des membres `BAN MEMBERS` !")
        if (!membre) return message.channel.send(message.author.username + ", tu dois mentioné quelqu'un !")
        if (membre.hasPermission("ADMINISTRATOR")) return message.channel.send(message.author.username + ", tu ne peut pas ban cette personne !")
        message.guild.member(membre).ban(membre)
        message.channel.send("✅ " + membre + " a ete ban")
    }

    //stream
    if (message.content === prefix + "stream") {
        client.user.setPresence({ game: { name: '%help !', type: "STREAMING", url: "https://twitch.tv/%24" } });
        message.channel.send("mon status a bien été changer en `stream %help !`")
    }

    //regarde
    if (message.content === prefix + "regarde") {
        client.user.setActivity("%help !", { type: "WATCHING" });
        message.channel.send("mon status a bien été changer en `regarde %help !`")
    }

    //ecoute 
    if (message.content === prefix + "ecoute") {
        client.user.setActivity("%help !", {type: "LISTENING"});
        message.channel.send("mon status a bien été changer en `ecoute %help !`")
    }

    //rank
    if (args[0].toLocaleLowerCase() === prefix + 'rank') {
        let user = message.mentions.users.first() || message.author
        let uXp = xp[user.id].xp
        let uAvatar = user.avatarURL
        var embed = new Discord.RichEmbed()
            .setTitle("xp de " + user.username + " :")
            .setThumbnail(uAvatar)
            .setDescription("GG " + user + ' tu a accumulé **' + uXp + "** points d'XP ! :clap:")
        message.channel.send(embed)
        return
    }

    // del
    if (args[0].toLocaleLowerCase() === prefix + 'del') {
        let count = args[1]
        if (!count) return message.channel.send("veuillez indiquer un nombre de message a supprimer")
        if (isNaN(count)) message.channel.send("veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    // embed personnalisé
    if (args[0].toLocaleLowerCase() === prefix + 'embed') {
        let colorP = args.slice(1).join(" ");
        let textP = args.slice(2).join(" ");
        if (!textP) return message.channel.send(" entre du texte")
        var embedP = new Discord.RichEmbed()
        .setColor(colorP)
        .setDescription(textP)
        message.channel.send(embedP)
    }

    //add rank
    if (message.content === message.content) {

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0
            }
        }

        var xptemp1 = Math.floor(Math.random() * 3) + 1
        var xptemp2 = Math.floor(Math.random() * 3) + 1

        console.log(xptemp1 + ":" + xptemp2)

        if (xptemp1 != xptemp2) return

        xp[message.author.id].xp = xp[message.author.id].xp
        xp[message.author.id] = {
            xp: xp[message.author.id].xp + xptemp1
        }
        fs.writeFile("./xp.json", JSON.stringify(xp, null, 4), err => {
            if (err) throw err;
        });
        console.log("créé avec succes")
        return
    }

   

});
client.login(config.Token);
