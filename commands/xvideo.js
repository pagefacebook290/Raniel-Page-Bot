const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { sendVideoAttachment } = require('../utils/sendVideoAttachment');

module.exports = {
  name: 'xvideo',
  usage: '-xvideo',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/xvideos?page=1&limit=10');
      const videos = response.data?.videos;
      if (!videos || videos.length === 0) {
        return sendMessage(senderId, { text: 'No videos found.' }, pageAccessToken);
      }

      // pick one random video
      const random = videos[Math.floor(Math.random() * videos.length)];

      const videoUrl = random.mp4url;
      const fileName = `temp_video.mp4`;
      const filePath = path.join(__dirname, '..', 'temp', fileName);

      const writer = fs.createWriteStream(filePath);
      const request = https.get(videoUrl, (res) => {
        res.pipe(writer);
        writer.on('finish', async () => {
          writer.close();

          await sendVideoAttachment(senderId, filePath, pageAccessToken);

          // Optional: clean up temp file
          fs.unlink(filePath, () => {});
        });
      });

      request.on('error', (err) => {
        console.error('Download error:', err.message);
        sendMessage(senderId, { text: 'Failed to download video.' }, pageAccessToken);
      });
    } catch (err) {
      console.error('xvideo error:', err.message);
      sendMessage(senderId, { text: 'Something went wrong.' }, pageAccessToken);
    }
  }
};
