const axios = require("axios");
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: "gpt4",
  description: "Analyze images or answer.",
  usage: "gpt4 <question> | Reply to an image",
  author: "Mark",

  async execute(senderId, args, pageAccessToken, event, imageUrl) {
    const userPrompt = args.join(" ").trim();

    if (!userPrompt && !imageUrl && !getAttachmentUrl(event)) {
      return sendMessage(senderId, {
        text: "Please send a image first or provide a question."
      }, pageAccessToken);
    }

    if (!imageUrl) {
      imageUrl = getAttachmentUrl(event) || (await getRepliedImage(event, pageAccessToken));
    }

    try {
      const apiUrl = `https://zaikyoo.onrender.com/api/4ov2`;
      const query = {
        prompt: userPrompt || "Answer all questions that need to answer?",
        uid: senderId,
        img: imageUrl || ""
      };

      const { data } = await axios.get(apiUrl, { params: query });

      if (!data || !data.reply) {
        return sendMessage(senderId, {
          text: "Unable to process your request."
        }, pageAccessToken);
      }

      await sendMessage(senderId, { text: data.response }, pageAccessToken);

    } catch (error) {
      console.error("Error:", error.message || error);
      await sendMessage(senderId, {
        text: "An error occurred."
      }, pageAccessToken);
    }
  }
};

function getAttachmentUrl(event) {
  const attachment = event.message?.attachments?.[0];
  return attachment?.type === "image" ? attachment.payload.url : null;
}

async function getRepliedImage(event, pageAccessToken) {
  if (event.message?.reply_to?.mid) {
    try {
      const { data } = await axios.get(`https://graph.facebook.com/v21.0/${event.message.reply_to.mid}/attachments`, {
        params: { access_token: pageAccessToken }
      });
      const imageData = data?.data?.[0]?.image_data;
      return imageData ? imageData.url : null;
    } catch (error) {
      console.error("Error fetching replied image:", error.message || error);
      return null;
    }
  }
  return null;
}