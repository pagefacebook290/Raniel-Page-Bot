 const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'hentaivid',
  description: 'Send random hentai videos (based on the given count).',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      // Default to 1 video if no argument provided
      const count = parseInt(args[0]) || 1;

      // Limit to prevent abuse
      if (count < 1 || count > 10) {
        await sendMessage(senderId, {
          text: '⚠️ Puwede ka lang humiling ng 1 hanggang 10 videos.',
        }, pageAccessToken);
        return;
      }

      const apiUrl = 'https://kaiz-apis.gleeze.com/api/henataivid';
      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.length > 0) {
        const videos = response.data.result.slice(0, count);

        const formatted = videos.map((vid, index) => {
          return `#${index + 1} - ${vid.title}\nLink: ${vid.video_url}`;
        }).join('\n\n');

        await sendMessage(senderId, {
          text: `**Hentai Videos:**\n\n${formatted}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Walang nahanap na hentai videos. Subukan muli mamaya.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching hentai videos:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang mga hentai videos. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
