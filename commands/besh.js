const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'besh',
  description: 'Get answer from unity ai',
  usage: 'unity [question]',
  author: 'raniel',

  async execute(senderId, args, pageAccessToken) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: besh <prompt>" }, pageAccessToken);

    try {
       const { data } = await axios.get(`https://api.kenliejugarap.com/unity/?question=${encodeURIComponent(prompt)}`);
      
      sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
