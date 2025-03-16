const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'shoti',
  description: 'Generate a random video.',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';
      const response = await axios.get(apiUrl);

      if (response.data && response.data.video_url) {
        const videoUrl = response.data.video_url;

        // Send video attachment only
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
        await sendMessage(senderId, { text: 'No video found. Please try again later.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching video:', error.message);
      await sendMessage(senderId, { text: 'Sorry, there was an error generating the video. Please try again later.' }, pageAccessToken);
    }
  },
};
