const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

// Read Page Access Token from file
const token = fs.readFileSync('token.txt', 'utf8');

// List of quotes (add as many as you like)
const quotes = [
  `"The best way to get started is to quit talking and begin doing." - Walt Disney`,
  `"Don't let yesterday take up too much of today." - Will Rogers`,
  `"It's not whether you get knocked down, it's whether you get up." - Vince Lombardi`,
  `"If you are working on something exciting, it will keep you motivated." - Steve Jobs`,
  `"Success is not in what you have, but who you are." - Bo Bennett`,
  `"Start where you are. Use what you have. Do what you can." - Arthur Ashe`,
  `"Believe you can and you're halfway there." - Theodore Roosevelt`
];

module.exports = {
  name: 'dailyquote',
  description: 'Sends a daily inspirational quote',
  usage: 'dailyquote',
  author: 'Raniel',

  /**
   * This command is meant to be triggered automatically (e.g., by a cron job or scheduler)
   * @param {string} senderId - The recipient user or page ID (your page's ID for broadcasts)
   */
  execute: async (senderId) => {
    const pageAccessToken = token;

    try {
      // Get today's index based on day of year
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const quote = quotes[dayOfYear % quotes.length];

      // Send the quote
      await sendMessage(senderId, { text: `📜 Daily Quote:\n\n${quote}` }, pageAccessToken);

    } catch (error) {
      console.error('Error sending daily quote:', error.message);
      await sendMessage(senderId, {
        text: '❌ Error: Failed to send daily quote.'
      }, pageAccessToken);
    }
  }
};
