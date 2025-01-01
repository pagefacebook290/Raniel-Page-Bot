const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'pinayflix',
  description: 'Searches videos from API',
  usage: 'pinayflix <query> [page]',
  author: 'Secret',
  async execute(senderId, args, pageAccessToken) {
    if (args.length < 1) {
      await sendMessage(senderId, { text: 'Usage: pinayflix <query> [page]' }, pageAccessToken);
      return;
    }

    const query = args[0];
    const page = args[1] || 1;

    await sendMessage(senderId, { text: `Searching for "${query}"...` }, pageAccessToken);

    try {
      const apiUrl = `http://sgp1.hmvhostings.com:25743/pinay?search=${encodeURIComponent(query)}&page=${page}`;
      const response = await axios.get(apiUrl);
      const videoData = response.data;

      await sendMessage(senderId, { text: `Found ${videoData.length} videos for "${query}"` }, pageAccessToken);

      videoData.forEach((video) => {
        const videoUrl = video.url;
        sendMessage(senderId, { 
          attachment: { 
            type: 'video', 
            payload: { 
              url: videoUrl, 
              is_reusable: true 
            } 
          } 
        }, pageAccessToken);
      });
    } catch (error) {
      console.error('Error:', error.message);
      await sendMessage(senderId, { text: 'Failed to search videos. Try again later.' }, pageAccessToken);
    }
  }
};