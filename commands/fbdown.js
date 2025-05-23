const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'fbdown',
  description: 'Download Facebook video',
  usage: 'fbdown <video link>',
  author: 'Raniel',
  
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const videoLink = args.join(' ');

    if (!videoLink) {
      return sendMessage(senderId, { text: 'Usage: fbdown <video link>' }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/fbdl-v2?url=${encodeURIComponent(videoLink)}&apikey=1301192b-ce75-4de8-a8ff-6457ba456f78`);
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
