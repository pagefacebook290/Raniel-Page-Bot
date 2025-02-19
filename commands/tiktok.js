const axios = require('axios');
const { sendMessage } = require('../handles/handleMessage');

module.exports = {
  name: 'tiktok',
  description: 'Download TikTok video',
  usage: 'tiktok <video link>',
  author: 'raniel',
  execute: async (senderId, args, client) => {
    const videoLink = args.join(' ');
    if (!videoLink) {
      return sendMessage(senderId, { text: 'Usage: tiktok <video link>' });
    }
    try {
      const response = await axios.get(`https://sandipbaruwal.onrender.com/tikdown?url=${encodeURIComponent(videoLink)}`);
      const videoUrl = response.data;
      if (!videoUrl) {
        return sendMessage(senderId, { text: 'Failed to retrieve video.' });
      }
      sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } });
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' });
    }
  }
};
