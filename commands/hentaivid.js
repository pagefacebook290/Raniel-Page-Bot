 const axios = require('axios');

async function checkVideoLink(url) {
  try {
    const res = await axios.head(url);
    return res.status === 200;
  } catch {
    return false;
  }
}

module.exports = {
  name: 'henataivid',
  description: 'Send a random henatai video link.',
  usage: '-tempmail gen OR -tempmail inbox',
  author: 'Raniel',
  
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/henataivid');
      const videos = response.data?.videos;

      if (!videos || !Array.isArray(videos) || videos.length === 0) {
        throw new Error('Walang video na nakuha mula sa API.');
      }

      // Try up to 5 times to find a working link
      let workingVideo = null;
      for (let i = 0; i < 5; i++) {
        const candidate = videos[Math.floor(Math.random() * videos.length)];
        const isWorking = await checkVideoLink(candidate);
        if (isWorking) {
          workingVideo = candidate;
          break;
        }
      }

      if (!workingVideo) {
        throw new Error('Walang gumaganang video sa ngayon. Subukan ulit mamaya.');
      }

      await sendMessage(senderId, {
        text: `Heto ang random henatai video mo:\n${workingVideo}`
      }, pageAccessToken);

    } catch (error) {
      console.error('Error sending video link:', error.message);
      await sendMessage(senderId, {
        text: 'Nagka-error habang kumukuha ng video. Paki-try ulit.'
      }, pageAccessToken);
    }
  }
};
