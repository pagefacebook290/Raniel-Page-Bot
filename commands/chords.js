 const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: "chords",
  author: "Raniel",
  execute: async ({ api, event, args }) => {
    const songTitle = args.join(" ").trim();

    if (!songTitle) {
      api.sendMessage("Usage: chords [song title]", event.threadID);
      return;
    }

    try {
      const response = await api.get(`https://jerome-web.onrender.com/service/api/chords?title=${encodeURIComponent(songTitle)}`);
      const chords = response.data;

      if (chords) {
        api.sendMessage(`Chords for "${songTitle}":\n${chords}`, event.threadID);
      } else {
        api.sendMessage(`No chords found for "${songTitle}".`, event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("Error fetching chords.", event.threadID);
    }
  }
};
