const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'barcodegen',
  description: 'Generate a barcode from text (Code128)',
  usage: 'barcodegen <text>',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const text = args.join(' ');

    if (!text) {
      return sendMessage(senderId, {
        text: 'Usage: barcodegen <text to encode>',
      }, pageAccessToken);
    }

    try {
      // Generate barcode image URL
      const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(text)}&scale=3&includetext=true`;

      // Send the barcode as image via direct URL
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: barcodeUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Barcode Generator Error:', error.message);
      await sendMessage(senderId, {
        text: 'Failed to generate barcode. Please try again later.',
      }, pageAccessToken);
    }
  }
};
