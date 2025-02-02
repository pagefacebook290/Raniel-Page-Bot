const axios = require('axios');
const { sendmessage } = require('./handles/sendmessage');

module.exports = {
  name: 'gpt4',
  description: 'interact with gpt-4o',
  usage: 'gpt4 [your message]',
  author: 'coffee',

  async execute(senderid, args, pageaccesstoken) {
    const prompt = args.join(' ');
    if (!prompt) return sendmessage(senderid, { text: "usage: gpt4 <question>" }, pageaccesstoken);

    try {
      const { data: { response } } = await axios.get(`api/4ov2?prompt=${encodeURIComponent(prompt)}&uid=${senderid}&img=https%3A%2F%2Fwww.thispersondoesnotexist.com%2F`);

      const parts = [];

      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      }

      // send all msg parts
      for (const part of parts) {
        await sendmessage(senderid, { text: part }, pageaccesstoken);
      }

    } catch (error) {
      sendmessage(senderid, { text: 'there was an error generating the content. please try again later.' }, pageaccesstoken);
    }
  }
};
