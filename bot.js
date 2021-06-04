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
    if(message.channel.id === finalchanID){ //change to finalchanID
        /*Create a group and assign it members
        template: ~create GROUPNAME USER1 USER2 and so on (USERS are optional)
        samples: ~create group10, ~create group3 @abeeK @snopp doog @jan mice
             1) make a role that can access respective text and voice channels
             2) check if users were specified to be added to role
             3) create text channel with role permission
             4) create voice channel with role permission   
        */

        //include check permissions for user and add security
        //check if its command and users w/o the desired group
        if (msg[0] === '~create' && message.member.hasPermission('ADMINISTRATOR')){
            if (msg.length === 1){
                message.channel.send('It seems you have forgotten to mention the group you want to make!')
            }
            else if(message.guild.roles.cache.find(x => x.name === msg[1]) !== undefined){
                message.channel.send('Group role already exists.')
            }
            else{
            
            /* list for future embed
            //.setColor(0x5FB5C7) //logo blue
                message.channel.send("Role " + msg[1] +" succesfully made!")
                message.channel.send(`Role ${role.name} has been added to <@${
                    mentions[i].id
                  }>.`);
                message.channel.send(tchan.name + 'found. Deleting...')
                message.channel.send(vchan.name + ' VC found. Deleting?')
                message.channel.send(vchan.name + ' role found. Deleting?')


            */
            
            //role generation
            var role = await message.guild.roles.create({ // Creating the role.
                data: {
                    name: msg[1],
                    color: 0x979c9f,
                    //permissions: defualt perms are the @everyone perms in the server
                }
            }).catch((e) => message.channel.send(`Couldn't create role. | ${e}`));
            
            
            //adding users if mentioned
            if(message.mentions.members.size > 0){
                const mentions = message.mentions.members.array();
                for (var i = 0; i < mentions.length; i++) {
                    mentions[i].roles.add(role).catch((e) => message.channel.send(`Couldn't add role. | ${e}`));
                    //make an array of the members that were given the role for line 36
                }
            }
            
            //text channel generation
            message.guild.channels.create(msg[1], {
                type: 'text',
                permissionOverwrites:[
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    }
                ]
                }).then((channel) => {
                //const catID = '784533297266819123'
                const finalID = '757335055797583963'
                channel.setParent(finalID) //change to finalID
                channel.overwritePermissions(channel.guild.roles.cache.msg[1], {VIEW_CHANNEL : 'true'})
                
            })
            //voice channel generation
            message.guild.channels.create(msg[1] + '-voice', {
                type: 'voice'
                }).then((channel) => {
                //const catID = '678054215033028610'
                const finalID = '757335055797583964' 
                channel.setParent(finalID) //change to finalID
                channel.overwritePermissions(channel.guild.roles.cache.msg[1], {VIEW_CHANNEL : 'true'})
            })
            message.channel.send("Group successfully created!")
            }
        }
        if(msg[0] === '~delete' && message.member.hasPermission('ADMINISTRATOR')){
            if (msg.length === 1){
                message.channel.send('It seems you have forgotten to mention the group you want to delete!')
            }
            else if((message.guild.roles.cache.find(x => x.name === msg[1]) === undefined) && (message.guild.channels.cache.find(x => x.name === msg[1]) === undefined) && (message.guild.channels.cache.find(x => x.name === msg[1]+'-voice') === undefined)){
                message.channel.send('Group does not exist.')
            }
            else{
                //check for TC, VC and role seperately
                const tchan = message.guild.channels.cache.find(r => r.name === msg[1]);
                if(tchan !== undefined) tchan.delete();
                else message.channel.send('TC not existent.')
                
                const vchan = message.guild.channels.cache.find(r => r.name === msg[1]+'-voice');
                if(vchan !== undefined) vchan.delete();
                else message.channel.send('VC not existent.')

                const rl = message.guild.roles.cache.find(r => r.name === msg[1]);
                if(rl !== undefined) rl.delete();
                else message.channel.send('Role not existent.')
                message.channel.send("Group successfully removed!")

            }
        }
        if(msg[0] === '~assign' && message.member.hasPermission('ADMINISTRATOR')){
            if (msg.length === 1){
                message.channel.send('It seems you have forgotten to mention the group you want to add users to!')
            }
            else if(message.guild.roles.cache.find(x => x.name === msg[1]) === undefined){
                message.channel.send('Group role does not exist.')
            }
            else{            
                const rl = message.guild.roles.cache.find(r => r.name === msg[1]);
                if(message.mentions.members.size > 0){
                    const mentions = message.mentions.members.array();
                    for (var i = 0; i < mentions.length; i++) {
                        mentions[i].roles.add(rl).catch((e) => message.channel.send(`Couldn't add role. | ${e}`));
                        //make an array of the members that were given the role for line 35
                    }
                    message.channel.send("Roles successfully added to users.")
                }
                else{
                    message.channel.send("Must mention users to assign role to.")
                }
            }
        }
        if (msg[0] === '~help' || msg[0] === '~halp' || msg[0] === '~list' || msg[0] === '~hjalp' || msg[0] === '~h'){
            const exrich = new Discord.MessageEmbed()
            .setColor(0xD4A338) //captain role gold
            .setTitle('Commands')
            .addFields(
                {
                    name: '**__Create Group__**',
                    value: '*Format:* ~create [group#] [OPTIONAL: `@user1`, `@user2`, etc.] \n *Example:* "~create group8 `@janice` `@anoop` `@abhi` `@salma`", "~create group3" \n *Description:* Create a group of participants by giving a group number/name and mentioning users if avaiable.'
                },
                {
                    name: '**__Assign to Group__**',
                    value: '*Format:* ~assign [group#] [`@user1`, `@user2`, etc.] \n *Example:* "~assign group3 `@arjun` `@emile`" \n *Description:* Assign additional members to an already existing group.'
                },
                {
                    name: "**__Delete Group__**",
                    value: '*Format:* ~delete [group#] \n *Example:* "~delete group8" \n *Description:* Delete an already existent group.'
                },
                {
                    name: "**__Mention User__**",
                    value: "hehehe abhiiiiiiiii mode goes brrr"
                }
            )
            .setFooter('I will help you my child.🧖')
            message.channel.send(exrich);
        }
        if(msg[0] === '~repeat'){
            if(message.content.replace('~repeat ','').toLowerCase() === 'im stupid' || message.content.replace('~repeat ','').toLowerCase() === "i'm stupid") message.channel.send('Yeah, we know.');
            else if(message.content.toLowerCase().includes('abhi')) message.channel.send('the bee is a god(dess)');
            else message.channel.send(message.content.replace('~repeat', ''));
        }
        if (msg[0] === '~mentionUser'){
            let member = message.mentions.members.first();
            message.channel.send(`Ok <@${
                member.id
              }> has been mentioned.`)
        }
        if(msg[0] === '~rich'){
            const exrich = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Test Embed')
            .addFields(
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title2', value: 'Some value here2', inline: true },
            )
            message.channel.send(exrich);
        }
        if (msg[0] === '~gn'){
            let member = message.member;
            message.channel.send('Goodnight, ' +
                member.displayName
              + '! 😴')
        }
        if (msg[0] === '~gm'){
            let member = message.member;
            message.channel.send('Goodmorning, ' +
                member.displayName
              + '! 🤩')
        }
        //say gn, gm, fun stuff available to public
        //request help from help center
        //meaning, set a diff channel ID and diff commands then, or check all perms
    }
    
})