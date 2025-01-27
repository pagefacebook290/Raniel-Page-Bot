const { sendMessage } = require('../handles/sendMessage');

const zodiacFacts = {
  'January': {
    dates: 'January 20 - February 18',
    fact: 'Aquarians, born between January 20 and February 18, are known for their humanitarianism, independence, and unconventional thinking.',
    zodiac: 'Aquarius',
    element: 'Air',
    symbol: '♒',
    ruling_planet: 'Uranus',
    personality_traits: [
      'Humanitarian',
      'Independent',
      'Unconventional',
      'Rebellious'
    ]
  },
  'February': {
    dates: 'February 19 - March 20',
    fact: 'Pisces, born between February 19 and March 20, are known for their compassion, intuition, and creativity.',
    zodiac: 'Pisces',
    element: 'Water',
    symbol: '♓',
    ruling_planet: 'Neptune',
    personality_traits: [
      'Compassionate',
      'Intuitive',
      'Creative',
      'Sensitive'
    ]
  },
  'March': {
    dates: 'March 21 - April 19',
    fact: 'Aries, born between March 21 and April 19, are known for their confidence, determination, and adventurous spirit.',
    zodiac: 'Aries',
    element: 'Fire',
    symbol: '♈',
    ruling_planet: 'Mars',
    personality_traits: [
      'Confident',
      'Determined',
      'Adventurous',
      'Impulsive'
    ]
  },
  'April': {
    dates: 'April 20 - May 20',
    fact: 'Tauruses, born between April 20 and May 20, are known for their practicality, reliability, and sensuality.',
    zodiac: 'Taurus',
    element: 'Earth',
    symbol: '♉',
    ruling_planet: 'Venus',
    personality_traits: [
      'Practical',
      'Reliable',
      'Sensual',
      'Stubborn'
    ]
  },
  'May': {
    dates: 'May 21 - June 20',
    fact: 'Geminis, born between May 21 and June 20, are known for their curiosity, versatility, and communication skills.',
    zodiac: 'Gemini',
    element: 'Air',
    symbol: '♊',
    ruling_planet: 'Mercury',
    personality_traits: [
      'Curious',
      'Versatile',
      'Communicative',
      'Unpredictable'
    ]
  },
  'June': {
    dates: 'June 21 - July 22',
    fact: 'Cancers, born between June 21 and July 22, are known for their emotional depth, nurturing spirit, and strong family ties.',
    zodiac: 'Cancer',
    element: 'Water',
    symbol: '♋',
    ruling_planet: 'Moon',
    personality_traits: [
      'Emotional',
      'Nurturing',
      'Loyal',
      'Sentimental'
    ]
  },
  'July': {
    dates: 'July 23 - August 22',
    fact: 'Leos, born between July 23 and August 22, are known for their confidence, creativity, and generosity.',
    zodiac: 'Leo',
    element: 'Fire',
    symbol: '♌',
    ruling_planet: 'Sun',
    personality_traits: [
      'Confident',
      'Creative',
      'Generous',
      'Prideful'
    ]
  },
  'August': {
    dates: 'August 23 - September 22',
    fact: 'Virgos, born between August 23 and September 22, are known for their practicality, attention to detail, and analytical nature.',
    zodiac: 'Virgo',
    element: 'Earth',
    symbol: '♍',
    ruling_planet: 'Mercury',
    personality_traits: [
      'Practical',
      'Analytical',
      'Precise',
      'Critical'
    ]
  },
  'September': {
    dates: 'September 23 - October 22',
    fact: 'Librans, born between September 23 and October 22, are known for their diplomacy, social skills, and balance.',
    zodiac: 'Libra',
    element: 'Air',
    symbol: '♎',
    ruling_planet: 'Venus',
    personality_traits: [
      'Diplomatic',
      'Social',
      'Balanced',
      'Indecisive'
    ]
  },
  'October': {
    dates: 'October 23 - November 21',
    fact: 'Scorpios, born between October 23 and November 21, are known for their intense passion, strong intuition, and unwavering determination.',
    zodiac: 'Scorpio',
    element: 'Water',
    symbol: '♏',
    ruling_planet: 'Pluto',
    personality_traits: [
      'Passionate',
      'Resourceful',
      'Determined',
      'Intense'
]
},
 'November': {
    dates: 'November 22 - December 21',
    fact: 'Sagittarians, born between November 22 and December 21, are known for their adventurous spirit, optimism, and love of learning.',
    zodiac: 'Sagittarius',
    element: 'Fire',
    symbol: '♐',
    ruling_planet: 'Jupiter',
    personality_traits: [
       'Adventurous',
       'Optimistic',
       'Independent',
       'Blunt'
]
},
  'December': {
    dates: 'December 22 - January 19',
    fact: 'Capricorns, born between December 22 and January 19, are known for their discipline, responsibility, and ambition.',
    zodiac: 'Capricorn',
    element: 'Earth',
    symbol: '♑',
    ruling_planet: 'Saturn',
    personality_traits: [
       'Disciplined',
       'Responsible',
       'Ambitious',
       'Perfectionistic'
]
}
};

    module.exports = {
      name: 'zodiac',
      description: 'Get information about a zodiac sign',
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
const message = `**${fact.zodiac} (${fact.dates})**\n\n${fact.fact}\n\n**Personality Traits:**\n${fact.personality_traits.join(', ')}\n\n**Element:** ${fact.element}\n**Symbol:** ${fact.symbol}\n**Ruling Planet:** ${fact.ruling_planet}`;
sendMessage(senderId, { text: message }, pageAccessToken);
  
}
  
};
