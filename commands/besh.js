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
       const { data } = await axios.get(`https://markdevs-last-api-p2y6.onrender.com/ashley?prompt=${encodeURIComponent(prompt)}&uid=1`);
      
      sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
