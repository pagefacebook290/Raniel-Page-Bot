
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'fbdl',
  usage: 'fbdl <Facebook Video URL>',
  description: 'Download Facebook videos.',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken) {
    try {
      // Check if URL is provided
      if (!args || args.length === 0) {
        await sendMessage(senderId, { text: 'Please provide a Facebook video URL.' }, pageAccessToken);
        return;
      }

      // Construct API URL
      const fbVideoUrl = args[0];
      const apiUrl = `https://betadash-search-download.vercel.app/fbdl?url=${encodeURIComponent(fbVideoUrl)}`;

      // Fetch video download link
      const oten = await axios.get(apiUrl);
      const videoUrl = oten.data;

      // Send video
      const ranielBigdick = `Downloading...`;
      await sendMessage(senderId, { text: ranielBigdick }, pageAccessToken);
      const videoMessage = {
        attachment: {
          type: 'video',
          payload: {
            url: videoUrl,
          },
        },
      };
      await sendMessage(senderId, videoMessage, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.ranielBigdick);
      sendMessage(senderId, { text: 'Sorry, there was an error downloading the video. Please try again later.' }, pageAccessToken);
    }
  },
};