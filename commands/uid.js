const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get user ID',
  usage: 'uid',
  author: 'Name',
  category: 'Info',
  async execute(senderId, args, pageAccessToken) {
    await sendMessage(senderId, {
      text: `Your user ID is: ${senderId}`
    }, pageAccessToken);
  }
};