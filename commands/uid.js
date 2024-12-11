const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get user ID',
  usage: 'uid',
  author: 'Name',
  category: 'Info',
  async execute(senderID, args, pageAccessToken) {
    await sendMessage(senderID, {
      text: `Your user ID is: ${senderID}`
    }, pageAccessToken);
  }
};
