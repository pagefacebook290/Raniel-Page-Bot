const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4o',
  usage: 'gpt4 [your message]',
  author: 'Raniel',
  

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: gpt4 <question>" }, pageAccessToken);

    try {
      const { data: { response } } = await axios.get(`https://kaiz-apis.gleeze.com/api/venice-ai?ask=${encodeURIComponent(prompt)}&uid=${senderId}&apikey=3be7c751-a15e-4ff7-8896-72cfdfc811ac`);

      const parts = [];

      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      }

      // send all msg parts
      for (const part of parts) {
        await sendMessage(senderId, { text: part }, pageAccessToken, ' Sending...');
      }

    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};