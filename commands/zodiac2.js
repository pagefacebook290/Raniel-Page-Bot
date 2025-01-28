const { sendMessage } = require('../handles/sendMessage');

const zodiacFacts = {
  'January': {
    dates: 'January 20 - February 18.',
    fact: 'Aquarians are known for their innovative, humanitarian, and independent spirit. They value freedom and originality, often thinking outside the box. Their unique perspectives and strong ideals make them natural leaders in social causes.',
    zodiac: 'Aquarius',
    element: 'Air',
    symbol: '',
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
  'February': {
    dates: 'February 19 - March 20.',
    fact:'Pisceans are known for their compassion, creativity, and intuitive nature. They are sensitive individuals who often connect deeply with others emotions. Their artistic inclinations and dreamy disposition make them imaginative and empathetic.',
    zodiac: 'Pisces',
    element: 'Water',
    symbol: '',
    ruling_planet: 'Neptune',
    personality_traits: [
      'Compassionate',
      'Intuitive',
      'Creative',
      'Sensitive'
    ],
    best_matches: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'],
    worst_matches: ['Aries', 'Libra', 'Gemini']
  },
  // ...
};

const zodiacSigns = [
  { sign: 'Aquarius', start: 'January 20', end: 'February 18' },
  { sign: 'Pisces', start: 'February 19', end: 'March 20' },
  { sign: 'Aries', start: 'March 21', end: 'April 19' },
  { sign: 'Taurus', start: 'April 20', end: 'May 20' },
  { sign: 'Gemini', start: 'May 21', end: 'June 20' },
  { sign: 'Cancer', start: 'June 21', end: 'July 22' },
  { sign: 'Leo', start: 'July 23', end: 'August 22' },
  { sign: 'Virgo', start: 'August 23', end: 'September 22' },
  { sign: 'Libra', start: 'September 23', end: 'October 22' },
  { sign: 'Scorpio', start: 'October 23', end: 'November 21' },
  { sign: 'Sagittarius', start: 'November 22', end: 'December 21' },
  { sign: 'Capricorn', start: 'December 22', end: 'January 19' }
];

function getZodiacSign(date) {
  const month = date.split(' ')[0];
  const day = parseInt(date.split(' ')[1]);
  for (const sign of zodiacSigns) {
    const startMonth = sign.start.split(' ')[0];
    const startDay = parseInt(sign.start.split(' ')[1]);
    const endMonth = sign.end.split(' ')[0];
    const endDay = parseInt(sign.end.split(' ')[1]);
    if (month === startMonth && day >= startDay) {
      if (month === endMonth && day <= endDay) {
        return sign.sign;
      } else if (month !== endMonth) {
        return sign.sign;
      }
    }
  }
}

module.exports = {
  name: 'zodiac2',
  description: 'Get information about a zodiac sign',
  usage: 'zodiac [date]',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken) {
    if (args.length === 0) {
      return sendMessage(senderId, { text: 'Please provide a date (e.g. "zodiac November 21")' }, pageAccessToken);
    }
    const date = args[0];
    const sign = getZodiacSign(date);
    if (!sign) {
      return sendMessage(senderId, { text: 'Invalid date or zodiac sign not found.' }, pageAccessToken);
    }
    const fact = zodiacFacts[sign];
    if (!fact) {
  return sendMessage(senderId, { text: 'Zodiac sign not found.' }, pageAccessToken);
}
const message = `Dates: ${fact.dates}\n\nZodiac: ${fact.zodiac}\nSymbol: ${fact.symbol}\nElements: ${fact.element}\nRuling Planet: ${fact.ruling_planet}\n\nFacts: ${fact.fact}\n\nPersonality Traits:\n${fact.personality_traits.join(', ')}\n\nBest Matches: ${fact.best_matches.join(', ')}\n\nWorst Matches: ${fact.worst_matches.join(', ')}`;
sendMessage(senderId, { text: message }, pageAccessToken);

}
};

