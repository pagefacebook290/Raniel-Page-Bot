``
const { sendMessage } = require('../handles/sendMessage');

const zodiacFacts = {
  'January': 'People born in January are either Capricorns (December 22 - January 19) or Aquarians (January 20 - February 18), known for their discipline and humanitarianism, respectively.',
  'February': 'People born in February are either Aquarians (January 20 - February 18) or Pisces (February 19 - March 20), known for their independence and compassion, respectively.',
  'March': 'People born in March are either Pisces (February 19 - March 20) or Aries (March 21 - April 19), known for their intuition and adventurous spirit, respectively.',
  'April': 'People born in April are either Aries (March 21 - April 19) or Tauruses (April 20 - May 20), known for their confidence and reliability, respectively.',
  'May': 'People born in May are either Tauruses (April 20 - May 20) or Geminis (May 21 - June 20), known for their practicality and curiosity, respectively.',
  'June': 'People born in June are either Geminis (May 21 - June 20) or Cancers (June 21 - July 22), known for their versatility and emotional depth, respectively.',
  'July': 'People born in July are either Cancers (June 21 - July 22) or Leos (July 23 - August 22), known for their nurturing spirit and confidence, respectively.',
  'August': 'People born in August are either Leos (July 23 - August 22) or Virgos (August 23 - September 22), known for their creativity and practicality, respectively.',
  'September': 'People born in September are either Virgos (August 23 - September 22) or Librans (September 23 - October 22), known for their attention to detail and social skills, respectively.',
  'October': 'People born in October are either Librans (September 23 - October 22) or Scorpios (October 23 - November 21), known for their diplomacy and intensity, respectively.',
  'November': 'People born in November are either Scorpios (October 23 - November 21) or Sagittarians (November 22 - December 21), known for their passion and adventurous spirit, respectively.',
  'December': 'People born in December are either Sagittarians (November 22 - December 21) or Capricorns (December 22 - January 19), known for their optimism and discipline, respectively.'
};

module.exports = {
  name: 'zodiac',
  description: 'Get a fact about a zodiac sign',
  usage: 'zodiac [month]',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken) {
    if (args.length === 0) {
      return sendMessage(senderId, { text: 'Please provide a month (e.g. "zodiac August")' }, pageAccessToken);
    }
    const month = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();
    if (!zodiacFacts[month]) {
      return sendMessage(senderId, { text: `Sorry, I don't have information about the zodiac sign for ${month}.` }, pageAccessToken);
    }
    const fact = zodiacFacts[month];
    sendMessage(senderId, { text: fact }, pageAccessToken);
  }
};
