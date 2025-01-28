const { sendMessage } = require('../handles/sendMessage');

const zodiacSigns = {
  'Capricorn': { start: '12-22', end: '01-19' },
  'Aquarius': { start: '01-20', end: '02-18' },
  'Pisces': { start: '02-19', end: '03-20' },
  'Aries': { start: '03-21', end: '04-19' },
  'Taurus': { start: '04-20', end: '05-20' },
  'Gemini': { start: '05-21', end: '06-20' },
  'Cancer': { start: '06-21', end: '07-22' },
  'Leo': { start: '07-23', end: '08-22' },
  'Virgo': { start: '08-23', end: '09-22' },
  'Libra': { start: '09-23', end: '10-22' },
  'Scorpio': { start: '10-23', end: '11-21' },
  'Sagittarius': { start: '11-22', end: '12-21' },
};

const zodiacFacts = {
  'Capricorn': {
    dates: 'December 22 - January 19.',
    fact: 'Capricorns are known for their discipline, ambition, and practicality. They are hardworking individuals who set high goals for themselves and are determined to achieve them. Their responsible nature often makes them reliable friends and colleagues.',
    zodiac: 'Capricorn',
    element: 'Earth',
    symbol: '♑',
    ruling_planet: 'Saturn',
    personality_traits: [
      'Disciplined',
      'Responsible',
      'Ambitious',
      'Perfectionistic'
    ],
    best_matches: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    worst_matches: ['Aries', 'Libra', 'Sagittarius', 'Gemini']
  },
  'Aquarius': {
    dates: 'January 20 - February 18.',
    fact: 'Aquarians are known for their innovative, humanitarian, and independent spirit. They value freedom and originality, often thinking outside the box. Their unique perspectives and strong ideals make them natural leaders in social causes.',
    zodiac: 'Aquarius',
    element: 'Air',
    symbol: '♉',
    ruling_planet: 'Uranus',
    personality_traits: [
      'Humanitarian',
      'Independent',
      'Unconventional',
      'Rebellious'
    ],
    best_matches: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    worst_matches: ['Aries', 'Libra', 'Gemini']
  },
  // ...
};

module.exports = {
  name: 'zodiac',
  description: 'Get information about a zodiac sign',
  usage: 'zodiac <month> <day>',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken) {
    if (args.length < 2) {
      return sendMessage(senderId, { text: 'Please provide a month and a day. Usage: zodiac <month> <day>' }, pageAccessToken);
    }
    const month = args[0].toLowerCase();
    const day = parseInt(args[1], 10);
    // Convert month to a number (e.g., January -> 01)
    const monthMap = {
      'january': '01',
      'february': '02',
      'march': '03',
      'april': '04',
      'may': '05',
      'june': '06',
      'july': '07',
      'august': '08',
      'september': '09',
      'october': '10',
      'november': '11',
      'december': '12'
    };
    const monthNumber = monthMap[month];
    if (!monthNumber) {
      return sendMessage(senderId, { text: 'Invalid month. Please provide a valid month name.' }, pageAccessToken);
    }
    const dateString = `${monthNumber}-${String(day).padStart(2, '0')}`;
    // Find the zodiac sign based on the date
    let zodiacSign = 'Unknown Zodiac Sign';
    for (const [sign, { start, end }] of Object.entries(zodiacSigns)) {
      if (dateString >= start && dateString <= end) {
        zodiacSign = sign;
        break;
      }
    }
   const fact = zodiacFacts[zodiacSign];
if (!fact) {
  return sendMessage(senderId, { text: `Sorry, I don't have information about the zodiac sign for ${month} ${day}.` }, pageAccessToken);
}
const message = `Dates: ${fact.dates}\n\nZodiac: ${fact.zodiac}\nSymbol: ${fact.symbol}\nElements: ${fact.element}\nRuling Planet: ${fact.ruling_planet}\n\nFacts: ${fact.fact}\n\nPersonality Traits:\n${fact.personality_traits.join(', ')}\n\nBest Matches: ${fact.best_matches.join(', ')}\n\nWorst Matches: ${fact.worst_matches.join(', ')}`;
sendMessage(senderId, { text: message }, pageAccessToken);

}
};
