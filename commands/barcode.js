const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'barcode',
  description: 'Generate a barcode image link from text',
  usage: 'barcode <text>',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const text = args.join(' ');
    if (!text) {
      return sendMessage(senderId, { text: 'Usage: barcodegenerator <text to encode>' }, pageAccessToken);
    }

    // Generate barcode image URL (Code128 as default)
    const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(text)}&scale=3&includetext=true`;

    // Send as image message
    await sendMessage(senderId, {
      attachment: {
        type: 'image',
        payload: {
          url: barcodeUrl,
          is_reusable: true
        }
      }
    }, pageAccessToken);
  }
};
