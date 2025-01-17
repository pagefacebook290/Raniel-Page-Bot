const { MessengerBot } = require('messenger-bot');
const { sendMessage } = require('../handles/sendMessage');
const bot = new MessengerBot(pageAccessToken);

const uidCommand = async (senderId, data, pageAccessToken) => {
  const threadId = data.thread_id;
  let senderId;

  if (!data.reply) {
    senderId = data.author_id;
  } else {
    senderId = data.reply.author;
  }

  try {
    await bot.shareContact(`${senderId}`, senderId, threadId);
  } catch (error) {
    console.error('Error:', error.message);
    sendMessage(senderId, { text: 'Error sharing contact.' }, pageAccessToken);
  }
};

const config = {
  name: 'uid',
  description: 'Share user ID as contact.',
  usage: 'uid',
  author: 'Your Name',
  async execute(senderId, args, pageAccessToken) {
    const data = {
      thread_id: senderId,
      author_id: senderId,
      reply: args.reply
    };

    await uidCommand(senderId, data, pageAccessToken);
  }
};