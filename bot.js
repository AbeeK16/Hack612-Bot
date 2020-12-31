require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    const msg = message.content.split(" ")
    let rightChannel = false; 
    const chanID = '793958030407630888' // for bot-testing
    const finalchanID = '794016051653640202' // for Hack612
    if(message.channel.id === chanID){ //change to finalchanID
        /*Create a group and assign it members
        sample: ~create GROUPNAME USER1 USER2 and so on (USERS are optional) yea this is what i meant
             1) make a role that can access text and voice
             2) check if users were specified to be added to role
             3) create text channel with role permission
             4) create voice channel with role permission   
        */

        if (msg[0] === '~create'){
            if (msg.length === 1){
                message.channel.send('It seems you have forgotten to mention the group you want to make!')
            }
            else if(message.guild.roles.cache.find(x => x.name === msg[1]) !== undefined){
                message.channel.send('Group role already exists.')
            }
            else{
            //role generation
            message.guild.roles.create({
                data: {
                    name: msg[1],
                    color: 0x979c9f
                }
            })
            message.channel.send(role.name + ' made!')
            //adding users if mentioned
            let role = message.guild.roles.cache.find(r => r.name === msg[1]);//msg[1]);
            message.channel.send(role.name + ' found!')
            if(message.mentions.members.size > 0){
                const mentions = message.mentions.members.array();
                for (var i = 0; i < mentions.length; i++) {
                    mentions[i].roles.add(role)
                }
            }
            /*
            //text channel generation
            message.guild.channels.create(msg[1], {
            type: 'text'
            }).then((channel) => {
            const catID = '784533297266819123'
            const finalID = '794016051653640202'
            channel.setParent(catID) //change to finalID
            //channel.overwritePermissions(channel.guild.roles.msg[1], {VIEW_CHANNEL : 'true'})
            })
            //voice channel generation
            message.guild.channels.create(msg[1] + '-voice', {
                type: 'voice'
                }).then((channel) => {
                const catID = '678054215033028610'
                const finalID = '757335055797583964' 
                channel.setParent(catID) //change to finalID
            }) */
            message.channel.send("Group successfully created!")
            }
        }
        if (msg[0] === '~help' || msg[0] === '~halp' || msg[0] === '~list'){
            message.channel.send('I will help you my child. 🧖') //print out a list later
        }
        if (msg[0] === '~mentionUser'){
            let member = message.mentions.members.first();
            message.channel.send(`Ok <@${
                member.id
              }> has been mentioned.`)
        }
    }
    
})