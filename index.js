const Discord = require('discord.js');
const client = new Discord.Client();
var usersInQueue = [];
var memNicks = {};
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
//Client Join Waiting Quese Voice Channel
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
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
    if (usersInQueue.length >= 10) { //change
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
                for (var i = 0; i < 10; i++) //change
                {
                    const mem = usersInQueue[i];
                    //var rand = Math.random();

                    //random selection of team
                    //(rand > 0.5 && count<=2 ) ||
                    if (count1 >= 5) { //change
                        const chan = client.channels.get(team1)
                        mem.setVoiceChannel(chan)
                            .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
                            .catch(console.error);
                         memNicks[String(mem)] = mem.displayName;
                        mem.setNickname("[Team " + (l+1)+ "] " + mem.displayName);
                        console.log(mem);
                        console.log("NICKNAME: " + mem.displayName);
                        console.log("CHANGED 1");
                        count++;

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

        usersInQueue.splice(0, 10); //change

    }




    //removes the 10 users from the queue




})
//Message Commands



//'180793953652572170' => [Object],
//      '270047342579679232' => [Object] }

//
// client.on('message', message => {
//     console.log(message.content);
//
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
client.login('NzIwMDU4NDU4Nzk5NDcyNjQw.XuAmcA.DohXvggyPrhQfTmN3tEa5wMkXrk');
