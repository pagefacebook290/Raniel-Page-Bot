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
      console.log('Search Data:', searchData); // <--- Added this line
      if (!searchData || searchData.length === 0) {
        return sendMessage(senderId, { text: 'No results found.' }, pageAccessToken);
      }

      const videoOptions = searchData.map((video, index) => {
        return `${index + 1}. ${video.title} (${video.size})`;
      }).join('\n');

      sendMessage(senderId, { text: `Search results:\n\n${videoOptions}\n\nPlease reply with the number of your chosen video.` }, pageAccessToken);

      // Wait for user response
      const userResponse = await getMessage(senderId);

      if (!userResponse) {
        return;
      }

      const chosenNumber = parseInt(userResponse.text);

      if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > searchData.length) {
        return sendMessage(senderId, { text: 'Invalid choice.' }, pageAccessToken);
      }

      const chosenVideo = searchData[chosenNumber - 1];
      const videoUrl = chosenVideo.url;

      sendMessage(senderId, { attachment: { type: 'video', payload: { url: videoUrl } } }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};
