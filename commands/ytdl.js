const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'ytdl',
  description: 'Download YouTube video from a link.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const ytUrl = args[0];

      if (!ytUrl || !ytUrl.startsWith('http')) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang tamang YouTube link.\n\nExample:\nytdl https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }, pageAccessToken);
        return;
      }

      const encodedUrl = encodeURIComponent(ytUrl);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/ytdl?url=${encodedUrl}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.video_url) {
        const videoUrl = response.data.result.video_url;
        const title = response.data.result.title || 'YouTube Video';

        const videoMessage = {
          attachment: {
            type: 'video',
            payload: {
              url: videoUrl,
            },
          },
        };

        await sendMessage(senderId, {
          text: `📹 ${title}`,
        }, pageAccessToken);

        await sendMessage(senderId, videoMessage, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Hindi nakuha ang video. Siguraduhing valid ang link.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching YouTube video:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang video. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
