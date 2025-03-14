const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage'); 
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'shoti',
  description: 'Sends a random video from a curated source.',
  usage: 'shoti',
  author: 'Your Name', // Update this with your name
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const apiUrl = 'https://kaiz-apis.gleeze.com/?fbclid=IwZXh0bgNhZW0CMTEAAR3bdL2YwwA4TMhf5ZkwEzKgm6sBPUBqmItoSAsYOU56-NgdePHsklCVLo8_aem_42EqSpHVdl5X1quAPFNnyg'; // Your API URL 

    try {
      const { data } = await axios.get(apiUrl);

      if (!data || !data.videos || data.videos.length === 0) {
        return sendMessage(senderId, { text: '❌ No videos found at the moment. Please try again later.' }, pageAccessToken);
      }

      const randomIndex = Math.floor(Math.random() * data.videos.length);
      const randomVideo = data.videos[randomIndex];

      const videoMessage = {
        attachment: {
          type: 'video',
          payload: {
            url: randomVideo.url, // Assuming the API response has a 'url' property for the video 
            is_reusable: true
          }
        }
      };

      await sendMessage(senderId, videoMessage, pageAccessToken);
      await sendMessage(senderId, { text: `Enjoy this video!` }, pageAccessToken);
    } catch (error) {
      console.error('Error fetching video:', error.message);
      sendMessage(senderId, { text: '❌ An error occurred. Please try again later.' }, pageAccessToken);
    }
  }
};
