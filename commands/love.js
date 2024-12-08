
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'love',
  description: 'Interact with AI Girlfriend',
  usage: 'love [your message]',
  author: 'coffee',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: ai-gf <your message>" }, pageAccessToken);

    try {
      const { data } = await axios.get(`https://api.joshweb.click/api/ai-gf?q=${encodeURIComponent(prompt)}`);
      sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};
