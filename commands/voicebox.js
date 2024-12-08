
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'voicevox',
  description: 'Text-to-Speech using Voicevox',
  usage: 'voicevox [text]',
  author: 'coffee',

  /**
   * Execute Voicevox command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    const text = args.join(' ');

    if (!text) {
      return sendMessage(senderId, { text: "Usage: voicevox <text>" }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://api.joshweb.click/new/voicevox-speaker?text=${encodeURIComponent(text)}`);
      const audioUrl = response.data.audioUrl;

      sendMessage(senderId, { text: `Audio: ${audioUrl}` }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: 'Error generating audio. Try again later.' }, pageAccessToken);
    }
  }
};
