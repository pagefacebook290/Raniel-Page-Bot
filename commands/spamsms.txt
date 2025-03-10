const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'spamsms',
  usage: 'spamsms <number> | <count>',
  description: 'Send spam SMS to the specified number.',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    if (args.length < 2) {
      return sendMessage(senderId, {
        text: 'Please provide a phone number and the number of messages to send. Usage: sms <number> | <count>',
      }, pageAccessToken);
    }

    const [phone, count] = args.join(' ').split(' ').map(arg => arg.trim());

    if (!phone || !count || isNaN(count)) {
      return sendMessage(senderId, {
        text: 'Invalid input. Please provide a valid phone number and a numeric count. Usage: sms <number>   <count>',
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/spamsms?phone=${encodeURIComponent(phone)}&count=${encodeURIComponent(count)}&interval=1`;
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        await sendMessage(senderId, {
          text: `Successfully sent ${count} messages to ${phone}.`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: 'Failed to send messages. Please check the phone number and try again.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error:', error.message);
      await sendMessage(senderId, {
        text: 'Sorry, there was an error sending the messages. Please try again later.',
      }, pageAccessToken);
    }
  },
};
