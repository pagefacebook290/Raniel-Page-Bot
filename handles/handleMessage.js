const axios = require('axios');

const PAGE_ACCESS_TOKEN = require('../index').PAGE_ACCESS_TOKEN;

const sendMessage = async (senderId, message) => {
  try {
    const response = await axios.post(`https://graph.facebook.com/v21.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      recipient: { id: senderId },
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

module.exports = {
  handleMessage: async (event, token) => {
    const { sender, message } = event;
    const { text } = message;

    if (!text) return;

    const args = text.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const commands = require('../commands');

    const commandFile = commands.find((cmd) => cmd.name === command);

    if (!commandFile) return;

    try {
      await commandFile.execute(sender.id, args, sendMessage);
    } catch (error) {
      console.error('Error executing command:', error);
    }
  },
};
