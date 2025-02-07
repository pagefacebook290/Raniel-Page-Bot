const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'ai',
  description: 'Interact with AI',
  usage: 'ai [your message]',
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
        text: `━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━\nThis Ai is made by ICT students in Pau Excellencia Global Academy Foundation, Inc.(Pegafi)\n━━━━━━━━━━━━━━━━━━\nAdmin Link: https://www.facebook.com/100092248658233/`
      }, pageAccessToken);

    } catch (error) {
      await sendMessage(senderId, {
        text: `━━━━━━━━━━━━━\nError! Try again.\n━━━━━━━━━━━━`
      }, pageAccessToken);
    }
  }
};