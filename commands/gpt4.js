const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4o',
  usage: 'gpt4 [your message]',
  name: 'bible',
  description: 'Get a random Bible verse',
  usage: 'bible',
  author: 'Raniel',
  

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: gpt4 <question>" }, pageAccessToken);
    try {
      const { data: { response } } = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(prompt)}&uid=${senderId}&webSearch=off&apikey=72f8161d-50d4-4177-a3b4-bd6891de70ef`);
      const parts = [];
      const { data } = await axios.get('https://kaiz-apis.gleeze.com/api/bible', {
        params: {
          apikey: '72f8161d-50d4-4177-a3b4-bd6891de70ef'
        }
      });

      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      if (data?.result) {
        await sendMessage(senderId, {
          text: `📖 *${data.result.reference}*\n\n${data.result.text}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: "❌ Failed to retrieve a verse.",
        }, pageAccessToken);
      }
      // send all msg parts
      for (const part of parts) {
        await sendMessage(senderId, { text: part }, pageAccessToken, ' Sending...');
      }
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    } catch (error) {
      console.error('Bible API error:', error.message);
      await sendMessage(senderId, {
        text: "⚠️ Error fetching random verse. Try again later.",
      }, pageAccessToken);
    }
  }
};
};