const axios = require('axios');
const FormData = require('form-data');
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

      if (!args.length) {
        await sendMessage(senderId, { text: 'Please provide text to generate a barcode. Example: barcode 123456789012' }, pageAccessToken);
        return;
      }

      const text = args[0];
      const url = `https://api.api-ninjas.com/v1/barcodegenerate?format=png&type=upc&text=${encodeURIComponent(text)}`;

      // Fetch barcode image as buffer
      const response = await axios.get(url, {
        headers: { 'X-Api-Key': apikey },
        responseType: 'arraybuffer',
      });

      // Prepare image for Facebook attachment upload
      const form = new FormData();
      form.append('message', JSON.stringify({ attachment: { type: 'image', payload: { is_reusable: true } } }));
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
            attachment_id: attachmentId
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      await sendMessage(senderId, { text: 'Error generating barcode. Try again later.' }, pageAccessToken);
    }
  }
};
