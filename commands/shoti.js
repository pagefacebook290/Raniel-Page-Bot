
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
name: 'shoti',
usage: 'shoti',
description: 'Generate a random girl video.',
author: 'Raniel',
async execute(senderId, args, pageAccessToken, sendMessage) {
try {
const apiUrl = 'https://hiroshi-api.onrender.com/video/eabab';
const response = await axios.get(apiUrl);
const videoUrl = response.data.link;
const title = response.data.title;
const username = response.data.username;
const displayname = response.data.displayname;

  const oten = `Title: ${title}\nUsername: ${username}\nDisplay Name: ${displayname}\n\n𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌 𝕻𝖑𝖊𝖆𝖘𝖊 𝖂𝖆𝖎𝖙...
`;
  await sendMessage(senderId, { text: oten }, pageAccessToken);

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
  console.error('Error:', error.oten);
  sendMessage(senderId, {
    text: 'Sorry, there was an error generating the video. Please try again later.',
  }, pageAccessToken);
}

},
};
