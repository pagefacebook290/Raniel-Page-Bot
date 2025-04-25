const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'fbuid',
  description: 'Get Facebook UID from profile URL.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const fbUrl = args[0];

      if (!fbUrl || !fbUrl.startsWith('http')) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang tamang Facebook profile URL.\n\nExample:\nfbuid https://www.facebook.com/yourusername',
        }, pageAccessToken);
        return;
      }

      const encodedUrl = encodeURIComponent(fbUrl);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/fbuid?url=${encodedUrl}`;

      const response = await axios.get(apiUrl);

      // Log the full API response to inspect what is being returned
      console.log('API Response:', response.data);

      if (response.data && response.data.result) {
        const uid = response.data.result;
        await sendMessage(senderId, {
          text: `✅ Facebook UID: ${uid}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Hindi nakuha ang UID. Siguraduhing tama ang link at public ang profile.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching FB UID:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang UID. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
