const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'fbuid',
  description: 'Get Facebook ID from a Facebook URL.',
  async execute(senderId, args, pageAccessToken) {
    const url = args[0];

    if (!url) {
      return sendMessage(senderId, {
        text: '𝗘𝗿𝗿𝗼𝗿: 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗨𝗥𝗟.'
      }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://jerome-web.gleeze.com/service/api/fb?url=${encodeURIComponent(url)}`);

      const fbId = response.data.code;

      if (!fbId) {
        return sendMessage(senderId, { text: '𝗡𝗼 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗜𝗗 𝗳𝗼𝘂𝗻𝗱.' }, pageAccessToken);
      }

      await sendMessage(senderId, {
        text: `𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗜𝗗: ${fbId}`
      }, pageAccessToken);

    } catch (error) {
      console.error('fbid command error:', error.message);
      await sendMessage(senderId, {
        text: '𝗘𝗿𝗿𝗼𝗿: 𝗖𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗳𝗲𝘁𝗰𝗵 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗜𝗗.'
      }, pageAccessToken);
    }
  }
};