const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function sendVideoAttachment(senderId, filePath, pageAccessToken) {
  const form = new FormData();
  form.append('recipient', JSON.stringify({ id: senderId }));
  form.append('message', JSON.stringify({ attachment: { type: 'video', payload: {} } }));
  form.append('filedata', fs.createReadStream(filePath));

  await axios.post(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`,
    form,
    { headers: form.getHeaders() }
  );
}

module.exports = { sendVideoAttachment };
