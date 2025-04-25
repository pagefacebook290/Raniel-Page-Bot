 const axios = require('axios');

module.exports = {
  name: 'spamsms',
  description: 'Send multiple SMS messages to a number with a interval',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const [phone, count, interval] = args;

    if (!phone || !count || !interval) {
      sendMessage(senderId, { text: 'Usage: smsbomb [number] [count] [interval]' }, pageAccessToken);
      return;
    }

    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/spamsms?phone=${phone}&count=${count}&interval=${interval}`;
      const response = await axios.get(apiUrl);
      
      const { status, success, fail } = response.data;
      if (status) {
        sendMessage(senderId, { text: `Successfully sent ${success} SMS messages to ${phone}. ${fail} messages failed.` }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Failed to send SMS messages.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error sending SMS messages:', error);
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};