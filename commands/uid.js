const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get Facebook user ID',
  usage: 'uid [Facebook profile URL]',
  author: 'Name',
  category: 'Info',
  async execute(senderID, args, pageAccessToken) {
    if (!args.length) {
      return await sendMessage(senderID, { text: 'Please provide Facebook profile URL.' }, pageAccessToken);
    }

    const url = args[0];
    const regex = /(profile.php\?id=|\/)(\d+|[a-zA-Z0-9.]+)/;
    const match = url.match(regex);

    if (!match) {
      return await sendMessage(senderID, { text: 'Invalid Facebook profile URL.' }, pageAccessToken);
    }

    const userId = match[2];
    await sendMessage(senderID, { text: `Ang Facebook user ID ay: ${userId}` }, pageAccessToken);
  }
};