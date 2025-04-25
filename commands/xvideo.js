const axios = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { exec } = require('child_process');

module.exports = {
  name: 'xvideos',
  description: 'usage: -xvideos [page] [limit] | sends trimmed video clips',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken, sendMessage) {
    const page = args[0] || 1;
    const limit = args[1] || 1;

    const apiUrl = `https://kaiz-apis.gleeze.com/api/xvideos?page=${page}&limit=${limit}`;

    try {
      const res = await axios.get(apiUrl);
      const video = res.data.videos[0]; // Get only 1 for now

      if (!video) return sendMessage(senderId, { text: 'Walang nahanap na video.' }, pageAccessToken);

      const tempPath = path.join(__dirname, `../../temp`);
      if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);

      const videoPath = path.join(tempPath, `input.mp4`);
      const clippedPath = path.join(tempPath, `clip.mp4`);

      // Download video file
      const writer = fs.createWriteStream(videoPath);
      const videoStream = await axios.get(video.mp4url, { responseType: 'stream' });
      videoStream.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Trim video (first 10 seconds)
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .setStartTime(0)
          .setDuration(10)
          .output(clippedPath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });

      // Send clipped video
      const formData = {
        attachment: {
          type: 'video',
          payload: { is_reusable: true },
        },
        filedata: fs.createReadStream(clippedPath),
      };

      await sendMessage(senderId, formData, pageAccessToken);

      // Cleanup
      fs.unlinkSync(videoPath);
      fs.unlinkSync(clippedPath);

    } catch (err) {
      console.error('Error sending video:', err.message);
      await sendMessage(senderId, { text: 'May error habang nagse-send ng video.' }, pageAccessToken);
    }
  }
};
