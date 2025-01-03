;
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'shoti',
  usage: 'eabab',
  description: 'Generate a random girl video.',
  author: 'Jerome',
  
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti'; // Updated API URL
      const response = await axios.get(apiUrl);
      const videoUrl = response.data.link; // Assuming the response structure is similar
      const title = response.data.title;
      const username = response.data.username;
      const displayname = response.data.displayname;

      const message = `Title: ${title}\nUsername: ${username}\nDisplay Name: ${displayname}\n\n𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌 𝕻𝖑𝖊𝖆𝖘𝖊 𝖂𝖆𝖎𝖙...`;
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
      await sendMessage(senderId, {
        text: 'Sorry, there was an error generating the video. Please try again later.',
      }, pageAccessToken);
    }
  },
};
