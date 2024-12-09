
const axios = require('axios');

module.exports = {
  name: 'fbVideoDownloader',
  description: 'Automatically download Facebook videos',
  author: 'Gelie',

  /**
   * Handle incoming messages
   * @param {string} senderId - User ID
   * @param {string} message - Message text
   * @param {string} pageAccessToken - Page access token
   */
  async handleMessage(senderId, message, pageAccessToken) {
    const urlRegex = /https?:\/\/(www\.)?facebook\.com\/.*$/;
    if (urlRegex.test(message)) {
      try {
        const videoUrl = `https://api.joshweb.click/api/fbdl2?url=${encodeURIComponent(message)}`;
        const response = await axios.get(videoUrl, { responseType: 'stream' });
        const videoBuffer = await response.data;

        // Send video as attachment
        sendMessage(senderId, { attachment: videoBuffer }, pageAccessToken);
      } catch (error) {
        console.error('Error:', error);
        sendMessage(senderId, { text: 'Error downloading video. Try again later.' }, pageAccessToken);
      }
    }
  }
};