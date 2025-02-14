const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'humanize',
  description: 'Convert text to human voice',
  usage: 'humanize <text>',
  author: 'raniel',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const text = args.join(' ');

    if (!text) {
      return sendMessage(senderId, { text: 'Usage: humanizer <text>' }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/humanizer?q=${encodeURIComponent(text)}`);
      const audioUrl = response.data.audioUrl;

      if (!audioUrl) {
        return sendMessage(senderId, { text: 'Failed to generate audio.' }, pageAccessToken);
      }

      sendMessage(senderId, { attachment: { type: 'audio', payload: { url: audioUrl } } }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};
