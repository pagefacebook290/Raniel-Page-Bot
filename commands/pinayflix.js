const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'pinayflix',
  description: 'Search for video from PinayFlix',
  usage: 'pinaysearch <search title>',
  author: 'unggoy',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const searchQuery = args.join(' ');

    if (!searchQuery) {
      return sendMessage(senderId, { text: ' Usage: pinaysearch <title>' }, pageAccessToken);
    }

    const apiKey = `http://sgp1.hmvhostings.com:25743/pinay?search=${encodeURIComponent(searchQuery)}&page=1`;

    try {
      const { data } = await axios.get(apiKey);

      if (!data || data.length === 0) {
        return sendMessage(senderId, { text: ' No videos found for the given search query.' }, pageAccessToken);
      }

      // Send first video
      const video = data[0];
      const videoMessage = {
        attachment: {
          type: 'video',
          payload: {
            url: video.video,
            is_reusable: true
          }
        }
      };

      await sendMessage(senderId, { text: `📷 ${video.title}\nsana mag bago kana tigang boy.` }, pageAccessToken);
      await sendMessage(senderId, videoMessage, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred while processing the request. Please try again later.' }, pageAccessToken);
    }
  }
};