const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gemini',
  description: 'Analyze an image using Gemini AI',
  usage: 'gemini <prompt> (must reply to an image)',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken, messageEvent) {
    // User prompt after "gemini"
    const prompt = args.join(' ') || "Describe this image.";

    // Check if user replied to a message
    const repliedMessage = messageEvent?.message?.reply_to?.message;
    const imageAttachment = repliedMessage?.attachments?.find(att => att.type === 'image');

    if (!imageAttachment) {
      return await sendMessage(senderId, {
        text: '❎ | Please reply to an image and provide a prompt.\n\nExample:\nReply to a photo with:\n`gemini what is inside the image`',
      }, pageAccessToken);
    }

    const imageUrl = imageAttachment.payload.url;

    try {
      // Convert image to base64
      const base64Image = await getBase64FromUrl(imageUrl);

      // 🔐 Your Gemini API Key
      const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

      // Call Gemini Vision API
      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image
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
          text: `🧠 Gemini says:\n\n${reply}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: "⚠️ Gemini didn't return any response.",
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

// Convert image URL to base64 string
async function getBase64FromUrl(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary').toString('base64');
}
