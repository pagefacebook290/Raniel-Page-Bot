const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'fbuid',
  description: 'Get Facebook UID from profile URL.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      // Get the Facebook profile URL from args
      const fbUrl = args[0];

      // Check if the URL is provided and starts with 'http'
      if (!fbUrl || !fbUrl.startsWith('http')) {
        await sendMessage(senderId, {
          text: '⚠️ Pakibigay ang tamang Facebook profile URL.\n\nExample:\nfbuid https://www.facebook.com/yourusername',
        }, pageAccessToken);
        return;
      }

      // Encode the URL to make it safe for the API request
      const encodedUrl = encodeURIComponent(fbUrl);
      const apiUrl = `https://kaiz-apis.gleeze.com/api/fbuid?url=${encodedUrl}`;

      // Send the GET request to the API to fetch the UID
      const response = await axios.get(apiUrl);

      // Check if the API response contains a valid result
      if (response.data && response.data.result) {
        const uid = response.data.result;
        
        // Send the UID back to the user
        await sendMessage(senderId, {
          text: `✅ Facebook UID: ${uid}`,
        }, pageAccessToken);
      } else {
        // If no UID is found, send a message informing the user
        await sendMessage(senderId, {
          text: '⚠️ Hindi nakuha ang UID. Siguraduhing tama ang link at public ang profile.',
        }, pageAccessToken);
      }
    } catch (error) {
      // Log any errors and send an error message to the user
      console.error('Error fetching FB UID:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang UID. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
