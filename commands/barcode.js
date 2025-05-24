const axios = require('axios');
const FormData = require('form-data');
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
      // Generate barcode image as PNG buffer
      const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(text)}&scale=3&includetext=true`;

      const response = await axios.get(barcodeUrl, {
        responseType: 'arraybuffer',
      });

      // Upload barcode image to Facebook to get attachment_id
      const form = new FormData();
      form.append('message', JSON.stringify({
        attachment: {
          type: 'image',
          payload: { is_reusable: true },
        },
      }));
      form.append('filedata', Buffer.from(response.data), {
        filename: 'barcode.png',
        contentType: 'image/png',
      });

      const uploadRes = await axios.post(
        `https://graph.facebook.com/v19.0/me/message_attachments?access_token=${pageAccessToken}`,
        form,
        { headers: form.getHeaders() }
      );

      const attachmentId = uploadRes.data.attachment_id;

      // Send image using attachment ID
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            attachment_id: attachmentId,
          },
        },
      }, pageAccessToken);
    } catch (error) {
      console.error('Barcode Error:', error.response?.data || error.message);
      await sendMessage(senderId, {
        text: 'Failed to generate barcode. Please try again. oten',
      }, pageAccessToken);
    }
  },
};
