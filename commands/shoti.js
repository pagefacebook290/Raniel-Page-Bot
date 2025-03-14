const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const path = require('path'); 

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'shoti',
  description: 'Fetches a video using the Shoti API, downloads it, and sends it as a video attachment.',
  usage: 'shoti',
  author: 'Your Name', 
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';

    try {
      const { data } = await axios.get(apiUrl);

      if (data.status) {
        const videoUrl = data.video_url; // Assuming the API response has 'video_url'
        const videoTitle = data.title;
        const tiktokUrl = data.tiktok_url; // Assuming the API response has 'tiktok_url'
        const tempFilePath = path.join(__dirname, 'shoti.mp4');

        // Download the video
        const response = await axios({
          method: 'get',
          url: videoUrl,
          responseType: 'stream' 
        });

        const writer = fs.createWriteStream(tempFilePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        // Send the video
        await sendMessage(senderId, {
          attachment: {
            type: 'video',
            payload: {
              is_reusable: true
            }
          },
          filedata: {
            filename: 'shoti.mp4',
            content: fs.createReadStream(tempFilePath),
            content_type: 'video/mp4'
          }
        }, pageAccessToken);

        // Send the video title and TikTok URL
        await sendMessage(senderId, {
          text: `${videoTitle}\n\n${tiktokUrl}\n\nCredits: Kenlie`
        }, pageAccessToken);

        fs.unlinkSync(tempFilePath);

      } else {
        sendMessage(senderId, { text: 'Sorry, no video was found.' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error fetching, downloading, or sending the video:', error);
      sendMessage(senderId, { text: 'An error occurred while fetching the video. Please try again later.' }, pageAccessToken);
    }
  }
};
