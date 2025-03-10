const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'besh',
  description: 'Get haiku from API',
  usage: 'besh <prompt>',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: besh <prompt>" }, pageAccessToken);
    try {
      const { data } = await axios.get(`https://zaikyoo.onrender.com/api/claude3-5-haiku?prompt=${encodeURIComponent(prompt)}&uid=${senderId}`);
      sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the haiku. Please try again later.' }, pageAccessToken);
    }
  }
};
