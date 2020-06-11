const Discord = require('discord.js');
const client = new Discord.Client();
var usersInQueue = [];
var memNicks = {};
var chanState = {};
client.once('ready', () => {
    console.log('Ready!');
});
async function purge() {
    // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

    // We want to check if the argument is a number


    const fetched = await client.channels.get("720332869834113036").fetchMessages({
        limit: 100
    }); // This grabs the last number(args) of messages in the channel.
    console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

    // Deleting the messages
    client.channels.get("720332869834113036").bulkDelete(fetched)
        .catch(error => client.channels.get("720332869834113036").send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.


}
//Client Join Waiting Queue Voice Channel
client.on('voiceStateUpdate', (oldMember, newMember) => {



    let newUserChannel = newMember.voiceChannel;//gets the present/new voiceChannel of the Member
    let oldUserChannel = oldMember.voiceChannel;//gets the previous voiceChannel of the Member
    let name = newMember.displayName;
    var availableSet = [true, true, true, true, true, true];
    var setsArr = [
        ["720050821831590019", "720050839372169286"],
        ["720050860431769642", "720050879524372542"],
        ["720050896033153125", "720050913787510844"],
        ["720050926638858310", "720050939716698204"],
        ["720054604217319434", "720054652103819354"],
        ["720054674681626695", "720054689672200213"],
    ];

    // console.log("NewUserChannel: " + newUserChannel);
    // console.log("OldUserChannel: " + oldUserChannel);
    // console.log(" ");
    // console.log(String(newUserChannel));
    // console.log(" ");
    if (chanState[newMember] != newUserChannel) {
      chanState[newMember] = newUserChannel;
    //New User joins
    if (oldUserChannel === undefined || newUserChannel !== undefined) {
        console.log("Runs through 1.....the first if statement");

        if (String(newUserChannel).localeCompare("<#720062220968525824>")) {

            console.log("   Wrong");
            console.log('oldMemberID: ' + oldMember);
            var indexOld = usersInQueue.indexOf(newMember);
            console.log("newMemberID: " + newMember);
            console.log("IndexOLD(1): " + indexOld);

            usersInQueue.splice(indexOld, 1);

            console.log("   Old Member Queue" + usersInQueue);
            //console.log('');

        } else {
            console.log("   Right");
            usersInQueue.push(newMember);
            client.channels.get("720332869834113036").send(newMember + " You are ranked: " + String(usersInQueue.indexOf(newMember) + 1));
            console.log("   MemberQueue" + usersInQueue);
            newMember.setNickname(newMember.user.username);

            //console.log('');
        }
        if (String(newUserChannel).localeCompare("<#720073058982821890>")) {
            console.log("Wrong, not general.")
        } else {
          console.log("Right nickname");
          newMember.setNickname(newMember.user.username);
        }
        // console.log(" ");
        // console.log("   New user joined!");
        // console.log("   NEW MEMBER: " + newMember);
        //
        // console.log(" ");

        // console.log(client.voiceConnections.filter((connection)=>{return connection.server.id == 720062220968525824})[0].voiceChannel.members);
        //User leaves
    } else if (newUserChannel === undefined) {
        //console.log("Runs through 2......the else if statement");
        //console.log("   User left!");
        //console.log("   OLD MEMBER: " + oldMember);


        var indexOld = usersInQueue.indexOf(newMember);
        console.log("newMemberID: " + newMember);
        console.log("indexOld(2): " + indexOld);
        usersInQueue.splice(indexOld, 1);
        //console.log("   Old Member Queue" + usersInQueue);
        //console.log('');
        newMember.setNickname(newMember.user.username);
        console.log("CHANGED 3");
        console.log("   Latest Queue:" + usersInQueue);
        //console.log(client.voiceConnections.filter((connection)=>{return connection.server.id == 720062220968525824})[0].voiceChannel.members);
    }

    //Change the length equality to however many people......
    if (usersInQueue.length >= 6) { //change
        //randomly split the 10 users into two voice chats
        //for loop iterates through the sets of teams to check availability.
        for (var l = 0; l < 10; l++) {
            //If a set is found
            if (availableSet[l] === true) {
                //Setup teams aka pair of servers as string number ids
                var team1 = setsArr[l][0];
                var team2 = setsArr[l][1];
                //loop through each player of queue
                var count = 0;
                var count1 = 0;
                for (var i = 0; i < 6; i++) //change
                {
                    const mem = usersInQueue[i];
                    var rand = Math.random();
                    var hostTaken = false;
                    //random selection of team
                    //(rand > 0.5 && count<=2 ) ||
                    if (count1 >= 3) { //change
                      if (i === 2 || i === 5){//change
                        mem.setNickname("👑 [Team " + (l+1) + "] " + mem.displayName)
                        const chan = client.channels.get(team1)
                        mem.setVoiceChannel(chan)
                            .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
                            .catch(console.error);
                         memNicks[String(mem)] = mem.displayName;
                        count++;

                        if ((rand > 0.5 && hostTaken === false) || (i === 5 && hostTaken === false)){
                          mem.setNickname("🔥👑 [Team " + (l+1) + "] " + mem.displayName);
                          hostTaken = true;
                          var text = "  Hey, your job as the Host 🔥 of the lobby is to: \n\n\t\t 1) Add everyone on your team as a friend through their Riot names and Riot IDs. \n\t\t 2) Create a custom match lobby and invite everyone on your team to the lobby. \n\t\t 3) You should have gotten a message from the enemy Team Captain 👑 with their Riot name and Riot ID. Add them to the lobby as well. \n\t\t - That's it!! Now it is up to the Team Captain 👑 on the enemy team to invite his teammates to the lobby. HAVE FUN😀!! " ;
                          mem.send(text);
                        } else {
                          var text = "Hey, your job as a Team Captain 👑 is to: \n\n\t\t 1) Add everyone in your team as a friend through their Riot names and Riot IDs. \n\t\t 2) Message the Host 🔥 of the lobby on the enemy team through discord and send him your Riot name and Riot ID. \n\t\t 3) After the Host 🔥 invites you to the lobby, join and invite the rest of your team. \n\t\t 4) That\'s it!! HAVE FUN 😀!";
                          mem.send(text);
                        }
                      } else {
                        const chan = client.channels.get(team1)
                        mem.setVoiceChannel(chan)
                            .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
                            .catch(console.error);
                         memNicks[String(mem)] = mem.displayName;
                        mem.setNickname("[Team " + (l+1)+ "] " + mem.displayName);
                        //console.log(mem);
                        console.log("NICKNAME: " + mem.displayName);
                        console.log("CHANGED 1");
                        count++;
                      }

                    } else {
                      if (i === 2 || i === 5){//change
                        mem.setNickname("👑 [Team " + (l+1) + "] " + mem.displayName)
                        const chan = client.channels.get(team2)
                        mem.setVoiceChannel(chan)
                            .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
                            .catch(console.error);
                              count1++;

                          if ((rand > 0.5 && hostTaken === false) || (i === 5 && hostTaken === false)){
                            mem.setNickname("🔥👑 [Team " + (l+1) + "] " + mem.displayName);
                            hostTaken = true;
                            var text = "  Hey, your job as the Host 🔥 of the lobby is to: \n\n\t\t 1) Add everyone on your team as a friend through their names and Riot IDs. \n\t\t 2) Create a custom match lobby and invite everyone on your team to the lobby. \n\t\t 3) You should have gotten a message from the enemy Team Captain 👑 with their name and Riot ID. Add them to the lobby as well. \n\t\t - That's it!! Now it is up to the Team Captain 👑 on the enemy team to invite his teammates to the lobby. HAVE FUN😀!! " ;
                            mem.send(text);
                            }else {
                              var text = "Hey, your job as a Team Captain 👑 is to: \n\n\t\t 1) Add everyone in your team as a friend through their names and Riot IDs. \n\t\t 2) Message the Host 🔥 of the lobby on the enemy team through discord and send him your name and Riot ID. \n\t\t 3) After the Host 🔥 invites you to the lobby, join and invite the rest of your team. \n\t\t 4) That\'s it!! HAVE FUN 😀!";
                              mem.send(text);

                            }
                        } else {
                          const chan = client.channels.get(team2)
                          mem.setVoiceChannel(chan)
                              .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
                              .catch(console.error);
                           mem.setNickname("[Team " + (l+2)+"] "+mem.displayName);
                          console.log(mem);
                          console.log("NICKNAME: " + mem.displayName);
                          console.log("CHANGED 2");
                          count1++;
                        }

                    }

                }
                purge();
                break;

            } else if (l === 5) {
                console.log("Server completely full.");
                client.channels.get("720320856462459022").send("Server is full");
            }

        }

        // async () => {
        //   let fetched;
        //   do {
        //
        //      }
        //  while(fetched.size >= 2);
        // }

        //  fetched = client.channels.get("720332869834113036").fetchMessages({limit: 100});
        //client.channels.get("720332869834113036").bulkDelete(fetched);


        // We want to make sure we call the function whenever the purge command is run.
        purge();
        console.log("Purge did not work");

        usersInQueue.splice(0, 6); //change

    }




    //removes the 10 users from the queue


}

})



//Message Commands

// client.on('message', message => {
//   if (message.content == "!w"){
//     message.channel.send("🔥");
//   }
//
// })

//'180793953652572170' => [Object],
//      '270047342579679232' => [Object] }

//
client.on('message', message => {
  var prefix = "!5man"
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split('');
  const command = args.shift();

  if (command === "5man"){
      if (args.length < 5 || args.length > 5) {
          return message.channel.send("You provided too many, not enough, or no arguments. Correct usage would be: !5man @example @example @example @example @example")
      }
      message.channel.send(`Arguments: ${args}`);

  }
})

//
// }
//     var counter = 0;
//     let ids = [];
//
//     //restricts user from going on with the command if he is not in the right voice channel
//     if (message.content == "!w"){
//       var voiceChannelID = message.member.voiceChannel.id;
//       var voiceChannel = message.member.voiceChannel;
//       var timeStamp = message.member.voiceChannel.joinedTimestamp;
//       console.log("ConsoleTime: " + timeStamp);
//
//       //1591743605100 - mine
//       //1591748100251 tomas
//
//       //channel ID for "Waiting for scrim"
//       if (voiceChannelID == 720062220968525824){
//         var member = message.author.id;
//
//       //for loop that iterates through an array of stored user IDs to see if user already entered command
//         for (var i = 0; i < ids.length; i++){
//           if (ids[i] == member){
//             message.channel.send("You are already ranked.");
//           } else if (ids.length < 10 && ids[i] == null){
//             ids.push(member);
//             }
//       }
//         console.log(voiceChannel);
//
//       console.log(voiceChannelID);
//
//       //Sees if user is in "Waiting for scrim" voice channel
//         var voiceChannelName = message.member.voiceChannel.name;
//         //tells user their rank up to 100 users
//         if (counter <= 10){
//           message.channel.send("You are in queue. Ranked: " + counter);
//           counter++;
//         } else if (counter <= 20){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the second queue.");
//           counter++;
//         } else if (counter <= 30){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the third queue.");
//           counter++;
//         } else if (counter <= 40){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the fourth queue.");
//           counter++;
//         } else if (counter <= 50){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the fifth queue.");
//           counter++;
//         } else if (counter <= 60){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the sixth queue.");
//           counter++;
//         } else if (counter <= 70){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the seventh queue.");
//           counter++;
//         } else if (counter <= 80){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the eigth queue.");
//           counter++;
//         } else if (counter <= 90){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the ninth queue.");
//           counter++;
//         } else if (counter <= 100){
//           message.channel.send("You are in queue. Ranked: " + counter % 10 + ". In the tenth queue.");
//           counter++;
//         }
//
//         //moves users
//
//
//
//         //resets array to nothing if it is larger than 10.
//         if (ids.length > 10){
//           ids = [];
//         }
//
//         console.log("ConsoleName: " + voiceChannelName);
//         console.log("ConsoleID: " + voiceChannelID)
//         console.log("ConsoleRank: " + counter);
//         console.log("ConsoleMemberID: " + member);
//
//         //storing user IDs in array of 10
//         //capacity has been reached. Reset array and move users to voice chats.
//         if (ids.length > 10)
//         {
//           ids = [];
//         }
//       //if (message.member.voiceChannel == "Waiting for Scrim"){
//         //message.channel.send("Yessir");
//     //  }
//   } else {
//     message.channel.send("You are not in queue. Please join the \"Waiting for scrim\" voice chat");
//   }
//
//
//
// }
//});
client.login('NzIwMDU4NDU4Nzk5NDcyNjQw.XuFW1w.2CSWbcdwFagMmDKQ5hw1ezkp95Y');
