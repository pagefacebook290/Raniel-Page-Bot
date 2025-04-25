const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'xvideo',
  description: 'Send 3 random xvideos links.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/xvideos?page=3&limit=3';
      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.length > 0) {
        const videos = response.data.result;

        // Format video links and titles
        const formattedVideos = videos.map((vid, i) => {
          return `#${i + 1} - ${vid.title}\nLink: ${vid.video_url}`;
        }).join('\n\n');

        await sendMessage(senderId, {
          text: `**XVideos Results:**\n\n${formattedVideos}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Walang nahanap na xvideos data. Subukan muli mamaya.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching xvideos:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang xvideos. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
