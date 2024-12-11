
module.exports = {
  name: "uid",
  execute: async ({ api, event, pageAccessToken }) => {
    if (Object.keys(event.mentions).length === 0) {
      if (event.messageReply) {
        const senderID = event.messageReply.senderID;
        api.sendMessage(`User ID: ${senderID}`, event.threadID, { token: pageAccessToken });
      } else {
        api.sendMessage(`Your User ID: ${event.senderID}`, event.threadID, { token: pageAccessToken });
      }
    } else {
      for (const mentionID in event.mentions) {
        const mentionName = event.mentions[mentionID];
        api.sendMessage(`User ID of ${mentionName.replace('@', '')}: ${mentionID}`, event.threadID, { token: pageAccessToken });
      }
    }
  }
};
