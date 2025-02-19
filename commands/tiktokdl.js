const axios = require('axios');

module.exports = {
  name: 'tiktok',
  description: 'Download TikTok video',
  usage: 'tiktok <video link>',
  author: 'raniel',
  execute: async (senderId, args) => {
    const videoLink = args.join(' ');
    const apiUrl = `https://sandipbaruwal.onrender.com/tikdown?url=${encodeURIComponent(videoLink)}`;
    const response = await axios.get(apiUrl);
    const videoUrl = response.data;
    console.log(videoUrl);
  }
};
