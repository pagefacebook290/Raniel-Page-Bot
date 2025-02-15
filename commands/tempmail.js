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
      const response = await axios.get('https://temp-mail.org/api/v3/email/new');
      const emailAddress = response.data.email;
      return sendMessage(senderId, { text: `📧 | Temporary Email: ${emailAddress}` }, pageAccessToken);
    }
    if (cmd === 'inbox' && email) {
      try {
        const response = await axios.get(`https://temp-mail.org/api/v3/email/${email}/messages`);
        const messages = response.data.messages;
        if (!messages.length) return sendMessage(senderId, { text: 'Inbox is empty.' }, pageAccessToken);
        const message = messages[0];
        return sendMessage(senderId, { text: `📬 | Latest Email:\nFrom: ${message.from}\nSubject: ${message.subject}\nDate: ${message.date}` }, pageAccessToken);
      } catch {
        return sendMessage(senderId, { text: 'Error: Unable to fetch inbox or email content.' }, pageAccessToken);
      }
    }
    sendMessage(senderId, { text: 'Invalid usage. Use -tempmail gen or -tempmail inbox <email>' }, pageAccessToken);
  },
};
