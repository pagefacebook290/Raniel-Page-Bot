const axios = require('axios');

module.exports = {
  name: 'freesms',
  description: 'freesms <phonenumber> <message>.',
  author: 'raniel',
  
  async execute(senderid, args, pageaccesstoken, sendmessage) {
    const phonenumber = args[0];
    const message = args.slice(1).join(' ');

    // Validate input
    if (!phonenumber || !message) {
      return sendmessage(senderid, { text: '❌ Usage: freesms <phonenumber> <message>.' }, pageaccesstoken);
    }

    // Notify the user that the request is being processed
    sendmessage(senderid, { text: '⏳ Processing your request to send SMS, please wait...' }, pageaccesstoken);

    try {
      const response = await axios.get('https://haji-mix.up.railway.app/api/lbcsms', {
        params: {
          number: phonenumber,
          message: encodeURIComponent(message) // Fixed typo in function name
        }
      });

      const { status, response: messageresponse } = response.data;

      const responsetime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

      if (status) {
        sendmessage(senderid, { 
          text: `✅ Message has been successfully sent! \n\n📬 Message: ${messageresponse}\n\n⏰ Asia/Manila: ${responsetime}`
        }, pageaccesstoken);
      } else {
        sendmessage(senderid, { text: `❌ Failed to send the message: ${messageresponse}` }, pageaccesstoken);
      }

    } catch (error) {
      console.error('Error:', error);
      sendmessage(senderid, { text: '❌ Failed to send the message.' }, pageaccesstoken);
    }
  }
};
