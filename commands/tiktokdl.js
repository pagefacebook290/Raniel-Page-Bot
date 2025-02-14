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
      const response = await axios.get(`https://api.tiktok.com/v1/aweme/v1/aweme/bulletin/detail/?aweme_id=${videoLink.split('/')[videoLink.split('/').length - 1].split('?')[0]}`);
      const videoData = response.data;
      const videoUrl = videoData.aweme_detail.video.play_addr.url_list[0];

      if (!videoUrl) {
        console.log('Error: Video URL not found.');
        return sendMessage(senderId, { text: 'Failed to retrieve video.' }, pageAccessToken);
      }

      sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};
