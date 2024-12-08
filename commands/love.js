
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'ai',
  description: 'Interact with AI G',
  usage: 'ai [your message]',
  author: 'coffee',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: ai <your message>" }, pageAccessToken);

    try {
      const { data } = await axios.get(`https://api.joshweb.click/api/gpt-4o?q=${encodeURIComponent(prompt)}`);
      sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};
