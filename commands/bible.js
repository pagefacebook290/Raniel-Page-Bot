const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'bible',
  description: 'Get a random Bible verse or search by reference',
  usage: 'bible [book chapter:verse]',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const query = args.join(' ');

    // Fallback list of known verses
    const randomVerses = [
      "John 3:16",
      "Psalm 23:1",
      "Romans 8:28",
      "Philippians 4:13",
      "Proverbs 3:5",
      "Isaiah 41:10",
      "Jeremiah 29:11",
      "Matthew 6:33",
      "Galatians 2:20",
      "1 Corinthians 13:4-5",
    ];

    // If no user input, randomly select a verse from the list
    const searchQuery = query || randomVerses[Math.floor(Math.random() * randomVerses.length)];

    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/bible', {
        params: {
          apikey: '8c0a049d-29a8-474a-b15e-189e42e150fb',
          search: searchQuery,
        }
      });

      const data = response.data;

      if (data && data.result && data.result.text) {
        await sendMessage(senderId, {
          text: `📖 *${data.result.reference}*\n\n${data.result.text}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: `❌ oten No verse found. You searched: "${searchQuery}". oten Please check the input or try again.`,
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Bible API error:', error.message);
      await sendMessage(senderId, {
        text: "⚠️ oten An error occurred while fetching the verse. Please try again later.",
      }, pageAccessToken);
    }
  }
};
