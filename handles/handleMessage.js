 const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { sendMessage } = require('./sendMessage');

const commands = new Map();
const lastImageByUser = new Map();
const lastVideoByUser = new Map();
const imageProcessingQueue = new Map();
const prefix = '-';

fs.readdirSync(path.join(__dirname, '../commands'))
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const command = require(`../commands/${file}`);
    commands.set(command.name.toLowerCase(), command);
  });

function queueImageProcessing(senderId, imageUrl, pageAccessToken, event) {
  const queueItem = {
    timestamp: Date.now(),
    imageUrl,
    processed: false
  };
  
  imageProcessingQueue.set(senderId, queueItem);
  
  setTimeout(async () => {
    const item = imageProcessingQueue.get(senderId);
    if (item && !item.processed) {
      const geminiCommand = commands.get('gpt4');
      await geminiCommand.execute(senderId, [], pageAccessToken, event, imageUrl);
      imageProcessingQueue.delete(senderId);
    }
  }, 60000);
}

async function handleMessage(event, pageAccessToken) {
  const senderId = event?.sender?.id;
  if (!senderId) return console.error('Invalid event object');

  let imageUrl = '';
  if (event.message?.attachments) {
    const imageAttachment = event.message.attachments.find(att => att.type === 'image');
    const videoAttachment = event.message.attachments.find(att => att.type === 'video');
    
    if (imageAttachment) {
      imageUrl = imageAttachment.payload.url;
      lastImageByUser.set(senderId, imageUrl);
      queueImageProcessing(senderId, imageUrl, pageAccessToken, event);
    }
    
    if (videoAttachment) {
      lastVideoByUser.set(senderId, videoAttachment.payload.url);
    }
  }

  const messageText = event?.message?.text?.trim();
  if (!messageText) return;

  const [commandName, ...args] = messageText.startsWith(prefix)
    ? messageText.slice(prefix.length).split(' ')
    : messageText.split(' ');

  try {
    if (commands.has(commandName.toLowerCase())) {
      const command = commands.get(commandName.toLowerCase());
      const lastImage = lastImageByUser.get(senderId);
      const lastVideo = lastVideoByUser.get(senderId);

      if ([ 'gpt4'].includes(command.name)) {
        const mediaUrl = lastImage || lastVideo;
        if (mediaUrl) {
          const queueItem = imageProcessingQueue.get(senderId);
          if (queueItem) {
            queueItem.processed = true;
            imageProcessingQueue.set(senderId, queueItem);
          }
          await command.execute(senderId, args, pageAccessToken, event, mediaUrl);
          lastImageByUser.delete(senderId);
          lastVideoByUser.delete(senderId);
        }
      } else {
        await command.execute(senderId, args, pageAccessToken, sendMessage);
      }
    } else {
      if (event.message.reply_to?.mid) {
        try {
          imageUrl = await getAttachments(event.message.reply_to.mid, pageAccessToken);
        } catch (error) {
          console.error('Failed to get reply attachments:', error);
        }
      }
      await commands.get('gpt4').execute(senderId, [messageText], pageAccessToken, event, imageUrl);
      if (imageUrl) lastImageByUser.delete(senderId);
    }
  } catch (error) {
    console.error(`Error executing command:`, error);
    await sendMessage(
      senderId,
      { text: error.message || 'There was an error executing that command.' },
      pageAccessToken
    );
  }
}

async function getAttachments(mid, pageAccessToken) {
  if (!mid) throw new Error("No message ID provided.");
  
  try {
    const { data } = await axios.get(`https://graph.facebook.com/v21.0/${mid}/attachments`, {
      params: { access_token: pageAccessToken }
    });
    
    if (data?.data[0]?.image_data?.url) {
      return data.data[0].image_data.url;
    }
    throw new Error("No image found in the replied message.");
  } catch (error) {
    throw new Error("Failed to fetch attachments.");
  }
}

module.exports = { handleMessage };