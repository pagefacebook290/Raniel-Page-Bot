const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'lyrics',
  description: 'Get song lyrics by title.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const title = args.join(' ');

      if (!title) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang title ng kanta.\n\nExample:\nlyrics apt',
        }, pageAccessToken);
        return;
      }

      const encodedTitle = encodeURIComponent(title);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/lyrics?title=${encodedTitle}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.lyrics) {
        const { title: songTitle, artist, lyrics } = response.data.result;

        const message = `🎵 *${songTitle}* by *${artist}*\n\n${lyrics}`;

        // Handle long lyrics (Messenger limit ~2000 chars per message)
        const chunks = message.match(/[\s\S]{1,1900}/g);
        for (const chunk of chunks) {
          await sendMessage(senderId, { text: chunk }, pageAccessToken);
        }
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Walang nahanap na lyrics. Subukan ibang title.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching lyrics:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang lyrics. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
