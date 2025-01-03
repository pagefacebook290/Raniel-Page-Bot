 const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'shoti',
  description: 'Download short video.',
  usage: 'shoti',
  author: 'Iyo',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';
      const response = await axios.get(apiUrl);
      
      if (!response.data) {
        throw new Error('No data found');
      }
      
      const videoUrl = response.data[0].url;
      const title = response.data[0].title;
      
      const message = `Title: ${title}\nDownloading...`;
      
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
      sendMessage(senderId, { text: 'Sorry, may error sa pag-download ng video.' }, pageAccessToken);
    }
  },
};