const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

const API_BASE = 'https://kaiz-apis.gleeze.com/api';
const API_KEY = '1301192b-ce75-4de8-a8ff-6457ba456f78';

module.exports = {
  name: 'shoti',
  description: 'Fetch a random TikTok Shoti video.',
  usage: 'Shoti',
  author: 'Ry',

  execute: async (senderId) => {
    const pageAccessToken = token;
    const apiUrl = `${API_BASE}/shoti`;

    try {
      const { data } = await axios.get(apiUrl, {
        params: { apikey: API_KEY }
      });

      if (data.status === 'success' && data.shoti) {
        const { videoUrl } = data.shoti;

        const videoMessage = {
          attachment: {
            type: 'video',
            payload: {
              url: videoUrl,
            },
          },
        };

        await sendMessage(senderId, videoMessage, pageAccessToken);
      } else {
        sendError(senderId, '❌ Error: Unable to fetch Shoti video.', pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching Shoti video:', error.message);
      sendError(senderId, '❌ Error: Unexpected error occurred.', pageAccessToken);
    }
  },
};

const sendError = async (senderId, errorMessage, pageAccessToken) => {
  await sendMessage(senderId, { text: errorMessage }, pageAccessToken);
};