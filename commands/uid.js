const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get user ID',
  usage: 'uid',
  author: 'Name',
  category: 'Info',
  async execute(senderID, args, pageAccessToken) {
    try {
      const userId = String(senderID);
      if (!userId) throw new Error('Invalid sender ID');
      
      await sendMessage(senderID, { text: `Ang iyong user ID ay: ${userId}` }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      await sendMessage(senderID, { text: 'May error sa pagkuha ng user ID.' }, pageAccessToken);
    }
  }
};