const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'ytsearch',
  description: 'Search YouTube video',
  usage: 'ytsearch <search query>',
  author: 'raniel',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const searchQuery = args.join(' ');

    if (!searchQuery) {
      return sendMessage(senderId, { text: 'Usage: ytsearch <search query>' }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/ytsearch?q=${encodeURIComponent(searchQuery)}`);
      const searchData = response.data;

      if (!searchData) {
        return sendMessage(senderId, { text: 'No results found.' }, pageAccessToken);
      }

      const videoOptions = Object.keys(searchData).map((key, index) => {
        return `${index + 1}. ${searchData[key].title} (${searchData[key].duration})`;
      }).join('\n');

      sendMessage(senderId, { text: `Search results:\n\n${videoOptions}\n\nPlease reply with the number of your chosen video.` }, pageAccessToken);

      // Wait for user response
      const userResponse = await getMessage(senderId);

      if (!userResponse) {
        return;
      }

      const chosenNumber = parseInt(userResponse.text);

      if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > Object.keys(searchData).length) {
        return sendMessage(senderId, { text: 'Invalid choice.' }, pageAccessToken);
      }

      const chosenVideoKey = Object.keys(searchData)[chosenNumber - 1];
      const chosenVideo = searchData[chosenVideoKey];
      const videoUrl = `https://www.youtube.com/watch?v=${chosenVideo.videoId}`;

      sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};