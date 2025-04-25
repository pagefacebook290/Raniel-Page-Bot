const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'tiktokdl',
  description: 'Download TikTok video via link.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const tiktokUrl = args[0];

      if (!tiktokUrl || !tiktokUrl.startsWith('http')) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang tamang TikTok link.\n\nExample:\ntiktok https://vt.tiktok.com/ZSrcwyWK9/',
        }, pageAccessToken);
        return;
      }

      const encodedUrl = encodeURIComponent(tiktokUrl);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/tiktok-dl?url=${encodedUrl}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.video) {
        const videoUrl = response.data.result.video;

        const videoMessage = {
          attachment: {
            type: 'video',
            payload: {
              url: videoUrl,
            },
          },
        };

        await sendMessage(senderId, videoMessage, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Hindi ma-download ang video. Siguraduhing valid ang TikTok link.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching TikTok video:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang dinodownload ang video. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
