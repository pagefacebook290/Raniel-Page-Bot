const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'tempmail',
  description: 'Generate temporary email and check inbox',
  usage: '-tempmail gen OR -tempmail inbox <email>',
  author: 'coffee',
  async execute(senderId, args, pageAccessToken) {
    const [cmd, email] = args;

    if (cmd === 'gen') {
      try {
        const response = await axios.get('https://kaiz-apis.gleeze.com/api/tempmail-create');
        const emailAddress = response.data.address;
        return sendMessage(senderId, { text: ` Temporary Email: ${emailAddress}` }, pageAccessToken);
      } catch (error) {
        console.error('Error:', error.message);
        return sendMessage(senderId, { text: 'Error: Unable to generate temporary email.' }, pageAccessToken);
      }
    }

    if (cmd === 'inbox' && email) {
      try {
        const token = email.split('@')[0];
        const response = await axios.get(`https://kaiz-apis.gleeze.com/tempmail-inbox?token=${token}`);
        const inbox = response.data;
        if (!inbox.length) return sendMessage(senderId, { text: 'Inbox is empty.' }, pageAccessToken);
        const latestEmail = inbox[0];
        return sendMessage(senderId, { text: ` Latest Email:\nFrom: ${latestEmail.from}\nSubject: ${latestEmail.subject}\nDate: ${latestEmail.date}\n\nContent:\n${latestEmail.body}` }, pageAccessToken);
      } catch (error) {
        console.error('Error:', error.message);
        return sendMessage(senderId, { text: 'Error: Unable to fetch inbox or email content.' }, pageAccessToken);
      }
    }

    sendMessage(senderId, { text: 'Invalid usage. Use -tempmail gen or -tempmail inbox <email>' }, pageAccessToken);
  },
};