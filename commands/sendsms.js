
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'sendsms',
  usage: 'sendsms <number> <message>',
  description: 'Send SMS text.',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken) {
    try {
      // Check required arguments
      if (args.length < 2) {
        await sendMessage(senderId, { text: 'Usage: sendsms <number> <count> <message>' }, pageAccessToken);
        return;
      }

      // Extract number and message
      const number = args[0];
      const message = args.slice(1).join(' ');

      // Construct API URL
      const apiUrl = `https://yt-video-production.up.railway.app/spamsms?number=${encodeURIComponent(number)}&count=1&interval=1&message=${encodeURIComponent(message)}`;

      // Send SMS
      const response = await axios.get(apiUrl);
      await sendMessage(senderId, { text: `SMS sent to ${number}.` }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'Error sending SMS. Please try again later.' }, pageAccessToken);
    }
  },
};