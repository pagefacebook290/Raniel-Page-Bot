const axios = require('axios');

module.exports = {
  name: 'freesms',
  description: 'freesms <phonenumber> <message>.',
  author: 'Raniel',
  
  async execute(senderid, args, pageaccesstoken, sendmessage) {
    const phonenumber = args[0];
    const message = args.slice(1).join(' ');

    if (!phonenumber || !message) {
      return sendmessage(senderid, { text: '❌ 𝗨𝘀𝗮𝗴𝗲: 𝗳𝗿𝗲𝗲𝘀𝗺𝘀 𝗽𝗵𝗼𝗻𝗲 𝗻𝘂𝗺𝗯𝗲𝗿 𝗺𝗲𝘀𝘀𝗮𝗴𝗲' }, pageaccesstoken);
    }

    sendmessage(senderid, { text: '⏳ 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝗿𝗲𝗾𝘂𝗲𝘀𝘁 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘀𝗺𝘀, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...' }, pageaccesstoken);

    try {
      const response = await axios.get('https://wiegines3.vercel.app/api/freesms', {
        params: {
          number: phonenumber,
          message: encodeURIComponent(message)
        }
      });

      const { status, response: messageresponse } = response.data;

      const responsetime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

      if (status) {
        sendmessage(senderid, { 
          text: `𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘀𝗲𝗻𝘁 ✅ \n\n📬 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${messageresponse}\n\n⏰ 𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮: ${responsetime}`
        }, pageaccesstoken);
      } else {
        sendmessage(senderid, { text: '❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘁𝗵𝗲 𝗺𝗲𝘀𝘀𝗮𝗴2222𝗲.' }, pageaccesstoken);
      }

    } catch (error) {
      console.error('error:', error);
      sendmessage(senderid, { text: '❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝘀𝗲𝗻𝗱 𝘁𝗵𝗲 3333𝗺𝗲𝘀𝘀𝗮𝗴𝗲.' }, pageaccesstoken);
    }
  }
};
