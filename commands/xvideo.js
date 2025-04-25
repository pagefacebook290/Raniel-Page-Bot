const axios = require('axios');
const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'xvidsend',
  description: 'usage: -xvidsend | sends 1 video as attachment',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/xvideos?page=3&limit=3';
      const response = await axios.get(apiUrl);
      const videos = response.data?.videos;

      if (!Array.isArray(videos) || videos.length === 0) {
        return sendMessage(senderId, { text: 'Walang nakuhang video.' }, pageAccessToken);
      }

      const video = videos[0]; // pick first video
      const videoUrl = video.mp4url;

      // download video temporarily
      const tempPath = path.join(__dirname, 'tempvideo.mp4');
      const writeStream = fs.createWriteStream(tempPath);

      await new Promise((resolve, reject) => {
        request(videoUrl)
          .pipe(writeStream)
          .on('finish', resolve)
          .on('error', reject);
      });

      const formData = {
        recipient: JSON.stringify({ id: senderId }),
        message: JSON.stringify({ attachment: { type: 'video', payload: {} } }),
        filedata: fs.createReadStream(tempPath),
      };

      request.post({
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${pageAccessToken}`,
        formData: formData
      }, (err, res, body) => {
        fs.unlinkSync(tempPath); // delete temp video file

        if (err) {
          console.error('Video send error:', err);
          return sendMessage(senderId, { text: 'Error sa pagpapadala ng video.' }, pageAccessToken);
        }

        console.log('Video sent:', body);
      });

    } catch (err) {
      console.error('xvidsend command error:', err.message);
      await sendMessage(senderId, { text: 'May error habang kinukuha ang video.' }, pageAccessToken);
    }
  }
};
