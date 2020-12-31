require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', async message => {
    const msg = message.content.split(" ")
    const chanID = '793958030407630888' // for bot-testing
    const finalchanID = '794016051653640202' // for Hack612
    if(message.channel.id === chanID){ //change to finalchanID
        /*Create a group and assign it members
        template: ~create GROUPNAME USER1 USER2 and so on (USERS are optional)
        samples: ~create group10, ~create group3 @abeeK @snopp doog @jan mice
             1) make a role that can access respective text and voice channels
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
            
            /* list for future embed
                message.channel.send("Role " + msg[1] +" succesfully made!")
                
            */
            
            //role generation
            var role = await message.guild.roles.create({ // Creating the role.
                data: {
                    name: msg[1],
                    color: 0x979c9f
                }
            }).catch((e) => console.error(`Couldn't create role. | ${e}`)); // Catching for errors.
            
            
            //adding users if mentioned
            message.channel.send(role.name + ' found! Now assigning...');
            if(message.mentions.members.size > 0){
                const mentions = message.mentions.members.array();
                for (var i = 0; i < mentions.length; i++) {
                    //mentions[i].roles.add(role)
                    mentions[i].roles.add(role).then(() => { // Adding the role to the member.
                message.channel.send(`Role ${role.name} has been added to <@${mentions[i].id}>`); // Sending a message if the role has been added.
            }).catch((e) => console.error(`Couldn't add role. | ${e}`)); // Catching for errors.
                }
            }
            
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
            }) 
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