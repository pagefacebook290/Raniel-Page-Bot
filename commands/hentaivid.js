const axios = require('axios');

module.exports = {
  name: 'henataivid',
  description: 'Send a random henatai video.',
  autor: 'raniel', 
  
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/henataivid');
      const videos = response.data?.videos;

      if (!videos || !Array.isArray(videos) || videos.length === 0) {
        throw new Error('Walang nakuha na video mula sa API.');
      }

      // Randomly pick one video from the list
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      await sendMessage(senderId, {
        attachment: {
          type: 'video',
          payload: {
            url: randomVideo,
            is_reusable: false
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Error sending video:', error.message);
      await sendMessage(senderId, {
        text: 'May error habang kinukuha ang video. Subukang muli mamaya.'
      }, pageAccessToken);
    }
  }
};
