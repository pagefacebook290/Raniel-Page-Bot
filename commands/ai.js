const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'ai',
  description: 'Xao Ai',
  usage: 'ai [your Question or Message]',
  author: 'Gelie',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: ai <question>" }, pageAccessToken);

    try {
      const { data: { result } } = await axios.get(`https://api.kenliejugarap.com/llama/?question=Hello${encodeURIComponent(prompt)}&UID=${senderId}`);
      sendMessage(senderId, { text: result }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
