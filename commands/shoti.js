const axios = require('axios');

module.exports = {
  name: 'shoti',
  description: 'Get a Shoti video',
  author: 'Cliff & John lib',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';

    try {
      const response = await axios.get(apiUrl);
      const { video, username, nickname, region } = response.data;

      if (video) {
        const infoText = {
          text: `𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username || 'N/A'}\n𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${nickname || 'N/A'}\n𝗥𝗲𝗴𝗶𝗼𝗻: ${region || 'N/A'}\n\n𝖲𝖾𝗇𝖽𝗂𝗇𝗀 𝗏𝗂𝖽𝖾𝗈, 𝗐𝖺𝗂𝗍 𝖺 𝗌𝖾𝖼𝗈𝗇𝖽...`
        };

        await sendMessage(senderId, infoText, pageAccessToken);

        await sendMessage(senderId, {
          attachment: {
            type: 'video',
            payload: {
              url: video,
              is_reusable: true
            }
          },
          quick_replies: [
            {
              content_type: "text",
              title: "More shoti",
              payload: "MORE SHOTI"
            },
            {
              content_type: "text",
              title: "Help",
              payload: "HELP"
            },
            {
              content_type: "text",
              title: "Privacy Policy",
              payload: "PRIVACY POLICY"
            },
            {
              content_type: "text",
              title: "Feedback",
              payload: "FEEDBACK"
            }
          ]
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: 'Failed to retrieve Shoti video.'
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Shoti API Error:', error.message);
      await sendMessage(senderId, {
        text: 'Sorry, there was an error processing your request.'
      }, pageAccessToken);
    }
  }
};
