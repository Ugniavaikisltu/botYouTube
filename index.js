const Discord = require('discord.js');
var config = require('./config.json')
const client = new Discord.Client();

client.on('ready', () => {
    console.log('pret !')
});

client.on('message', async message => {
    let args = message.content.trim().split(/ +/g)

    if (message.content === config.Prefix + 'ping'){
        console.log('commande ping par ' + message.author.tag)
        let time = Date.now();
        await message.channel.send("Pong !").then(async(m) => await m.edit(`Pong : ${Date.now() - time} ms`))
    }

    if (args[0].toLocaleLowerCase() === config.Prefix + 'repete'){
        console.log('commande %repete par ' + message.author.tag)
        say = args.slice(1).join(" ");
        if (!say) return message.reply('tu dois ecrir un mot ou une frase apres %repete')
message.channel.send(say)
    }
})
client.login(config.Token);