const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'tiktokdl',
  description: 'Download TikTok video',
  usage: 'tiktokdl <video link>',
  author: 'raniel',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const videoLink = args.join(' ');

    if (!videoLink) {
      return sendMessage(senderId, { text: 'Usage: tiktokdl <video link>' }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://ssstik.io/api/?url=${encodeURIComponent(videoLink)}`);
      const videoData = response.data;

      if (videoData.success) {
        const videoUrl = videoData.data;
        sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Failed to retrieve video.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};
