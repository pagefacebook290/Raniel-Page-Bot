const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

const tiktokApi = 'https://sandipbaru.com/tiktok?url=';

const getTikTokVideo = async (url) => {
  try {
    const response = await axios.get(`${tiktokApi}${url}`);
    const videoUrl = response.data;
    return videoUrl;
  } catch (error) {
    console.error(error);
  }
};

const handleTikTokCommand = async (senderId, args, pageAccessToken) => {
  if (args.length === 0) {
    return sendMessage(senderId, { text: 'Please provide a TikTok video URL' }, pageAccessToken);
  }

  const tiktokUrl = args[0];
  getTikTokVideo(tiktokUrl).then((videoUrl) => {
    if (videoUrl) {
      sendMessage(senderId, { text: `TikTok video URL: ${videoUrl}` }, pageAccessToken);
    } else {
      sendMessage(senderId, { text: 'Failed to retrieve TikTok video URL' }, pageAccessToken);
    }
  });
};

module.exports = {
  name: 'tiktokdl',
  description: 'Get TikTok video URL',
  usage: 'tiktokdl <TikTok video URL>',
  author: 'Raniel',
  execute: handleTikTokCommand,
};
