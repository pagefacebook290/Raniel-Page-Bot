const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with AI',
  usage: 'gpt4 [your message]',
  author: 'mark',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');

    if (!prompt) {
      return sendMessage(senderId, {
        text: `━━━━━━━━━━━━━\nUsage: ai [message]\n━━━━━━━━━━━━━━`
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://api.shizuki.linkpc.net/api/groq?ask=${encodeURIComponent(prompt)}&uid=${senderId}`;
      const { data: { response } } = await axios.get(apiUrl);

      await sendMessage(senderId, {
        text: `━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━`
      }, pageAccessToken);

    } catch (error) {
      await sendMessage(senderId, {
        text: `━━━━━━━━━━━━━\nError! Try again.\n━━━━━━━━━━━━`
      }, pageAccessToken);
    }
  }
};