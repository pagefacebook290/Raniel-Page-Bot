const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const path = require('path'); // Import the path module for file path manipulation

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'shoti',
  description: 'Fetches a video using the Shoti API, downloads it, and sends it as a video attachment.',
  usage: 'shoti',
  author: 'Your Name', // Update with your name
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const apiUrl = 'https://shoti.kenliejugarap.com/getvideo.php?apikey=shoti-7eb71049889365e4d57c63fcb3e1d5e1bb80a178e4016bb48df704b0ed4f95798cb464105ae55c064bebb5d2470beed4c077a7bcf5f4b9673ecaaef349530bea2375588713cc819677428b042e9d665c85977c68cc';

    try {
      const { data } = await axios.get(apiUrl);

      if (data.status) {
        const videoUrl = data.videoDownloadLink;
        const videoTitle = data.title;
        const tiktokUrl = data.tiktokUrl;
        const tempFilePath = path.join(__dirname, 'shoti.mp4'); // Get the current directory for the temporary file

        // Download and save the video locally
        const response = await axios({
          method: 'get',
          url: videoUrl,
          responseType: 'stream' // Important for streaming downloads
        });

        const writer = fs.createWriteStream(tempFilePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        // Send the video as an attachment
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

        // Send the video title and TikTok URL after the video is sent
        await sendMessage(senderId, {
          text: `${videoTitle}\n\n${tiktokUrl}\n\nCredits raniel`
        }, pageAccessToken);

        // Remove the temporary file after sending
        fs.unlinkSync(tempFilePath);

      } else {
        // No video found message
        sendMessage(senderId, { text: 'Sorry, no video was found.' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error fetching, downloading, or sending the video:', error);
      sendMessage(senderId, { text: 'An error occurred while fetching the video. Please try again later.' }, pageAccessToken);
    }
  }
};
