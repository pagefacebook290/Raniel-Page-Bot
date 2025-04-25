const axios = require('axios');

module.exports = {
  name: 'xvideos',
  description: 'usage: -xvideos [page] [limit] | shows list of videos from API',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken, sendMessage) {
    const page = args[0] || 1;
    const limit = args[1] || 3;

    const apiUrl = `https://kaiz-apis.gleeze.com/api/xvideos?page=${page}&limit=${limit}`;

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data || !Array.isArray(data.videos)) {
        return sendMessage(senderId, { text: 'Walang nakuha mula sa API.' }, pageAccessToken);
      }

      const videoMessages = data.videos.map(video => {
        return `**${video.title}**
Duration: ${video.duration}
Upload Date: ${new Date(video.uploadDate).toLocaleDateString()}
Link: ${video.mp4url}`;
      }).join('\n\n');

      await sendMessage(senderId, {
        text: `**XVideos Results (Page ${data.page}, Limit ${data.userLimit})**\n\n${videoMessages}`,
      }, pageAccessToken);

    } catch (err) {
      console.error('xvideos command error:', err.message);
      await sendMessage(senderId, { text: 'May error habang kinukuha ang videos.' }, pageAccessToken);
    }
  }
};
