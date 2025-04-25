const axios = require('axios');

module.exports = {
  name: 'blowjob',
  description: 'Get a random blowjob image.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/blowjob');
      console.log('API Response:', response.data);

      // Based on common API structures, adjust this accordingly
      const imageUrl = response.data.url || response.data.image || response.data.result;

      if (!imageUrl) {
        throw new Error('Walang image na nakuha mula sa API.');
      }

      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: imageUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Error fetching blowjob image:', error.message);
      await sendMessage(senderId, {
        text: 'May error habang kinukuha ang image. Paki-try ulit mamaya.'
      }, pageAccessToken);
    }
  }
};
