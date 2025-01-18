const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get Facebook user ID',
  usage: 'uid [Facebook profile URL]',
  author: 'Name',
  category: 'Info',
  async execute(senderID, args, pageAccessToken) {
    if (!args.length) {
      return await sendMessage(senderID, { text: 'Please provide Facebook profile URL.' }, pageAccessToken);
    }

    const url = args[0];
    const username = url.split('/').pop();

    try {
      const response = await axios.get(`https://graph.facebook.com/${username}?fields=id&access_token=EAASWcZB00spABO0GifETV7w54cKclqQpmZA952DPBxZBSx1Ap037ZBi10MZCGd1bItARGEnWynzlxAHoOmSUEhPiVbADPmHm9fZBqT2SG3xrI0SDZAwXTBbMCKfn5DXGXYHw0Rd7ZBJP43MApl5RzJ2tL6ZARTbCGDOtJoYPasxAZCwUrJZBSVpSOYxzN78HExh46gTiwZDZD`);
      const userId = response.data.id;
      await sendMessage(senderID, { text: `Ang Facebook user ID ay: ${userId}` }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      await sendMessage(senderID, { text: 'Error sa pagkuha ng user ID.' }, pageAccessToken);
    }
  }
};
