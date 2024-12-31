const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
name: 'shoti',
usage: 'shoti',
description: 'Generate a random TikTok video.',
author: 'Jerome',
async execute(senderId, args, pageAccessToken, sendMessage) {
try {
const apiUrl = 'https://betadash-shoti-yazky.vercel.app/shotizxx?apikey=shipazu';
const response = await axios.get(apiUrl);
const videoUrl = response.data.videoDownloadLink;
//const title = response.data.title;
//const username = response.data.username;
//const tiktokUrl = response.data.tiktokUrl;

  const message = `Sending...`;
  await sendMessage(senderId, { text: message }, pageAccessToken);

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
  console.error('Error:', error.message);
  sendMessage(senderId, {
    text: 'Sorry, there was an error generating the video. Please try again later.',
  }, pageAccessToken);
}

},
};
