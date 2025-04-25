const axios = require('axios');

module.exports = {
  name: 'blowjob',
  description: 'Get a random blowjob GIF.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/blowjob');
      console.log('API Response:', response.data);

      const gifUrl = response.data.url; // assuming .url contains the GIF

      if (!gifUrl || !gifUrl.endsWith('.gif')) {
        throw new Error('Walang tamang GIF na nakuha mula sa API.');
      }

      await sendMessage(senderId, {
        attachment: {
          type: 'image', // GIFs are still sent as 'image' type
          payload: {
            url: gifUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Error sending GIF:', error.message);
      await sendMessage(senderId, {
        text: 'May error habang kinukuha ang GIF. Paki-try ulit mamaya.'
      }, pageAccessToken);
    }
  }
};
