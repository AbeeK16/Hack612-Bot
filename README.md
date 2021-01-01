# Hack612-Bot

The Hack612-Bot is a discord bot (uses Discord.js) made to assist FRC 612's hackathon.
It's main functionality is to quickly create and manage groups of participants in the hackathon.

A simple "~create" command can make a group present in the discord server.

For example, "~create group4 @janice @abhi @anoop @arjun" does the following:

-Create role "group4"
-Assign role "group4" to Janice, Abhi, Anoop and Arjun.
-Create text channel that is only accessible to group4 (unavailable to @everyone, but volunteers/admin have access)
-Creat voice channel with the same conditions as TC
