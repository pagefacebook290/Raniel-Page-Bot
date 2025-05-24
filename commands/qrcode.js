const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'qrcodegenerator',
  description: 'Generate a QR code from text',
  usage: 'qrcodegenerator <text>',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const text = args.join(' ');

    if (!text) {
      return sendMessage(senderId, {
        text: 'Usage: qrcodegenerator <text to encode>',
      }, pageAccessToken);
    }

    try {
      // Generate QR code image URL
      const qrCodeUrl = `https://bwipjs-api.metafloor.com/?bcid=qrcode&text=${encodeURIComponent(text)}&scale=4`;

      // Send the QR code as image via direct URL
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: qrCodeUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('QR Code Generator Error:', error.message);
      await sendMessage(senderId, {
        text: 'Failed to generate QR code. Please try again later.',
      }, pageAccessToken);
    }
  }
};
