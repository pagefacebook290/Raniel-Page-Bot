const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'removebg',
  description: 'Remove background from an image via URL.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const imageUrl = args[0];

      if (!imageUrl || !imageUrl.startsWith('http')) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang tamang image URL.\n\nExample:\nremovebg https://example.com/photo.jpg',
        }, pageAccessToken);
        return;
      }

      const encodedUrl = encodeURIComponent(imageUrl);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/removebg?url=${encodedUrl}&stream=false`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.result) {
        const outputImage = response.data.result;

        const imageMessage = {
          attachment: {
            type: 'image',
            payload: {
              url: outputImage,
            },
          },
        };

        await sendMessage(senderId, imageMessage, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Hindi ma-process ang image. Siguraduhing valid ang image URL.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error removing background:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang tinatanggal ang background. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
