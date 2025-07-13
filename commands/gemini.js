const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gemini',
  description: 'Analyze an image using Gemini AI',
  usage: 'gemini (must reply to an image)',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken, messageEvent) {
    try {
      // Check for image
      const attachments = messageEvent?.message?.attachments;
      const repliedMessage = messageEvent?.message?.reply_to?.message?.attachments;

      // Look for image in current or replied message
      const imageData = (attachments || repliedMessage || []).find(att => att.type === 'image');

      if (!imageData) {
        return await sendMessage(senderId, {
          text: '❎ | Please reply to an image or send one image first, then run this command.',
        }, pageAccessToken);
      }

      const imageUrl = imageData.payload.url;

      // 🔐 Replace with your real Gemini API Key
      const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: "Describe what's in this image." },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: await getBase64FromUrl(imageUrl)
                  }
                }
              ]
            }
          ]
        }
      );

      const reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        await sendMessage(senderId, {
          text: `🤖 Gemini says:\n\n${reply}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: "⚠️ Gemini didn't return a response.",
        }, pageAccessToken);
      }

    } catch (err) {
      console.error('Gemini error:', err.message);
      await sendMessage(senderId, {
        text: '⚠️ Something went wrong while analyzing the image.',
      }, pageAccessToken);
    }
  }
};

// Helper: fetch image and convert to base64
async function getBase64FromUrl(url) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(res.data, 'binary').toString('base64');
  }
