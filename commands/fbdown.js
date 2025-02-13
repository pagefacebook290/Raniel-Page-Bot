const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'fbdown',
  description: 'Download Facebook video',
  usage: 'fbdownloader <video link>',
  author: 'raniel',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const videoLink = args.join(' ');

    if (!videoLink) {
      return sendMessage(senderId, { text: 'Usage: fbdownloader <video link>' }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/fbdl?url=${encodeURIComponent(videoLink)}`);
      const videoData = response.data;
      const videoUrl = videoData.videoUrl;

      if (!videoUrl) {
        return sendMessage(senderId, { text: 'Failed to retrieve video.' }, pageAccessToken);
      }

      sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};
