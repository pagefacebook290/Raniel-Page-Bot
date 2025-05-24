const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'barcode',
  description: 'Generate a barcode from text (UPC format)',
  usage: 'barcode <text>',
  author: 'Raniel',

  /**
   * Execute Barcode command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    try {
      const apikey = 'l9XyRltWQxQyajzNuoIaow==CjHbxrmBpwHyJtHt';

      // Check if text is provided
      if (!args.length) {
        await sendMessage(senderId, { text: 'Please provide a number to convert to a barcode. Example: barcode 123456789012' }, pageAccessToken);
        return;
      }

      const text = args[0]; // Get the text for barcode
      const url = `https://api.api-ninjas.com/v1/barcodegenerate?format=png&type=upc&text=${encodeURIComponent(text)}`;

      // Fetch barcode image as buffer
      const response = await axios.get(url, {
        headers: { 'X-Api-Key': apikey },
        responseType: 'arraybuffer',
      });

      const imageData = Buffer.from(response.data, 'binary').toString('base64');

      // Send image as attachment
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            is_reusable: true,
            url: `data:image/png;base64,${imageData}`,
          }
        }
      }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error generating barcode. Try again later.' }, pageAccessToken);
    }
  }
};
