const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

const TEMP_MAIL_API = 'https://kaiz-apis.gleeze.com/api/tempmail-create';
const TEMP_MAIL_INBOX = 'https://kaiz-apis.gleeze.com/tempmail-inbox?token=';

module.exports = {
 name: 'tempmail',
 description: 'Generate temporary email and check inbox',
 usage: '-tempmail gen OR -tempmail inbox',
 author: 'coffee (modified by Kaizenji)',

 async execute(senderId, args, pageAccessToken) {
   const [cmd] = args;

    if (cmd === 'gen') {
      try {
      const res = await axios.get(TEMP_MAIL_API);
      const { address, token } = res.data;
      const message = `📧 | Temporary Email: ${address}\nToken: ${token}\n\nTo check inbox, use:\n-tempmail inbox ${token}`;
        return sendMessage(senderId, { text: message }, pageAccessToken);
    } catch (error) {
        return sendMessage(senderId, { text: 'Error generating temporary email.' }, pageAccessToken);
      }
    }

  if (cmd === 'inbox' && args[1]) {
    const token = args[1];
      try {
    const res = await axios.get(`${TEMP_MAIL_INBOX}${token}`);
    const inbox = res.data;

      if (!inbox.length) {
        return sendMessage(senderId, { text: 'Inbox is empty.' }, pageAccessToken);
      }

      const { from, subject, date, body } = inbox[0]; // assuming the API returns these fields
      const message = `📬 | Latest Email:\nFrom: ${from}\nSubject: ${subject}\nDate: ${date}\n\nContent:\n${body}`;
        return sendMessage(senderId, { text: message }, pageAccessToken);
    } catch (error) {
        return sendMessage(senderId, { text: 'Error fetching inbox.' }, pageAccessToken);
    }
   }

      return sendMessage(senderId, { text: 'Invalid usage. Use -tempmail gen or -tempmail inbox <token>' }, pageAccessToken);
   },
};
