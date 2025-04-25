const axios = require('axios');

module.exports = {
  name: 'hentaivid',
  description: 'Send a random hentai video link.',
  autor: 'Raniel', 
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/henataivid');
      const videos = response.data?.videos;

      if (!videos || !Array.isArray(videos) || videos.length === 0) {
        throw new Error('Walang nakuha na video mula sa API.');
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      await sendMessage(senderId, {
        text: `Heto ang random henatai video mo:\n${randomVideo}`
      }, pageAccessToken);

    } catch (error) {
      console.error('Error sending video link:', error.message);
      await sendMessage(senderId, {
        text: 'May error habang kinukuha ang video. Subukang muli mamaya.'
      }, pageAccessToken);
    }
  }
};
