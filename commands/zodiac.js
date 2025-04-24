const { sendMessage } = require('../handles/sendMessage');

 const zodiacFacts = {
 author:'Raniel' , 
 
  'January': {
    dates: 'January 20 - February 18.', 
    fact: 'Aquarians are known for their innovative, humanitarian, and independent spirit. They value freedom and originality, often thinking outside the box. Their unique perspectives and strong ideals make them natural leaders in social causes.',
    zodiac: 'Aquarius',
    element: 'Air',
    symbol: '♒',
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
    symbol: '♓',
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
  'March': {
    dates: 'March 21 - April 19.', 
    fact: `Aries individuals are known for their confidence, determination, and adventurous spirit. They are natural leaders who thrive on challenges and are often seen as bold and energetic. Their impulsive nature can lead them to take risks, but they are always ready for new experiences. `,
    zodiac: 'Aries',
    element: 'Fire',
    symbol: '♈',
    ruling_planet: 'Mars',
    personality_traits: [
      'Confident',
      'Determined',
      'Adventurous',
      'Impulsive'
    ],
    best_matches: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    worst_matches: ['Taurus', 'Cancer', 'Virgo', 'Capricorn']
  },
  'April': {
    dates: 'April 20 - May 20.', 
    fact: 'Tauruses are known for their reliability, patience, and practicality. They appreciate the finer things in life and often seek comfort and stability. Their strong work ethic and determination make them steadfast friends and partners. ',
    zodiac: 'Taurus',
    element: 'Earth',
    symbol: '♉',
    ruling_planet: 'Venus',
    personality_traits: [
      'Practical',
      'Reliable',
      'Sensual',
      'Stubborn'
    ],
    best_matches: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    worst_matches: ['Aries', 'Libra', 'Sagittarius', 'Aquarius']
  },
  'May': {
    dates: 'May 21 - June 20.', 
    fact: 'Geminis are known for their adaptability, curiosity, and sociable nature. They are quick thinkers who enjoy engaging in conversations and exploring new ideas. Their duality can make them versatile, but they may also struggle with indecision.',
    zodiac: 'Gemini',
    element: 'Air',
    symbol: '♊',
    ruling_planet: 'Mercury',
    personality_traits: [
      'Curious',
      'Versatile',
      'Communicative',
      'Unpredictable'
    ],
    best_matches: ['Aquarius', 'Libra', 'Aries', 'Sagittarius'],
    worst_matches: ['Taurus', 'Virgo', 'Cancer', 'Capricorn']
  },
  'June': {
    dates: 'June 21 - July 22.', 
    fact: 'Cancers are known for their emotional depth, nurturing qualities, and intuition. They are sensitive individuals who value family and home life. Their protective nature makes them loyal friends, but they can also be prone to mood swings.',
    zodiac: 'Cancer',
    element: 'Water',
    symbol: '♋',
    ruling_planet: 'Moon',
    personality_traits: [
      'Emotional',
      'Nurturing',
      'Loyal',
      'Sentimental'
    ],
    best_matches: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    worst_matches: ['Aries', 'Libra', 'Sagittarius', 'Aquarius']
  },
  'July': {
    dates: 'July 23 - August 22.', 
    fact: 'Leos are known for their charisma, creativity, and confidence. They are natural performers who enjoy being in the spotlight. Their generous and warm-hearted nature makes them inspiring leaders, but they can also be prone to pride.',
    zodiac: 'Leo',
    element: 'Fire',
    symbol: '♌',
    ruling_planet: 'Sun',
    personality_traits: [
      'Confident',
      'Creative',
      'Generous',
      'Prideful'
    ],
    best_matches: ['Sagittarius', 'Aries', 'Gemini', 'Libra'],
    worst_matches: ['Taurus', 'Virgo', 'Scorpio', 'Capricorn']
    
  },
  'August': {
    dates: 'August 23 - September 22.', 
    fact: 'Virgos are known for their practicality, attention to detail, and analytical nature. They often approach life with a methodical mindset and strive for perfection in their endeavors. Their critical thinking skills make them excellent problem solvers.',
    zodiac: 'Virgo',
    element: 'Earth',
    symbol: '♍',
    ruling_planet: 'Mercury',
    personality_traits: [
      'Practical',
      'Analytical',
      'Precise',
      'Critical'
      ],
      best_matches: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      worst_matches: ['Aries', 'Libra', 'Sagittarius', 'Gemini']
  },
  'September': {
    dates: 'September 23 and October 22.', 
    fact: 'Libras are known for their charm, diplomacy, and love for harmony. They value relationships and often seek balance in their lives. Their social nature makes them great communicators, but they may struggle with indecisiveness.',
    zodiac: 'Libra',
    element: 'Air',
    symbol: '♎',
    ruling_planet: 'Venus',
    personality_traits: [
      'Diplomatic',
      'Social',
      'Balanced',
      'Indecisive'
      ],
    best_matches: ['Gemini', 'Sagittarius', 'Aquarius', 'Leo'],
    worst_matches: ['Taurus', 'Virgo', 'Scorpio', 'Capricorn']
  },
  'October': {
    dates: 'October 23 - November 21.', 
    fact: 'Scorpios are known for their passion, intensity, and resourcefulness. They are deeply emotional individuals who value loyalty and honesty. Their mysterious nature can draw others in, but they can also be secretive and possessive.',
    zodiac: 'Scorpio',
    element: 'Water',
    symbol: '♏',
    ruling_planet: 'Pluto',
    personality_traits: [
      'Passionate',
      'Intuitive',
      'Determined',
      'Intense'
      ],
      best_matches: ['Taurus', 'Virgo', 'Cancer', 'Pisces'],
      worst_matches: ['Aries', 'Libra', 'Sagittarius', 'Gemini']
  },
  'November': {
    dates: 'November 22 - December 21.', 
    fact: 'Sagittarians are known for their optimism, adventurous spirit, and love for freedom. They are philosophical thinkers who enjoy exploring new ideas and cultures. Their enthusiasm for life can be contagious, but they may also struggle with commitment.',
    zodiac: 'Sagittarius',
    element: 'Fire',
    symbol: '♐',
    ruling_planet: 'Jupiter',
    personality_traits: [
      'Adventurous',
      'Optimistic',
      'Independent',
      'Blunt'
      ],
      best_matches: ['Aries', 'Leo', 'Aquarius', 'Gemini'],
      worst_matches: ['Taurus', 'Virgo', 'Scorpio', 'Capricorn']
    },
      'December': {
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
      

  
};

 module.exports = {
  name: 'zodiac',
  description: 'Get information about a zodiac sign',
  usage: 'zodiac [month]',
  author: 'Raniel',
  
  async execute(senderId, args, pageAccessToken) { if (args.length === 0) {
    return sendMessage(senderId, { text: 'Please provide a month (e.g. "zodiac August")' }, pageAccessToken);
    
  }
  const month = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();
  if (!zodiacFacts[month]) {
    return sendMessage(senderId, { text: `Sorry, I don't have information about the zodiac sign for ${month}.` }, pageAccessToken);
  }
  const fact = zodiacFacts[month];
  const message = `Dates: ${fact.dates}\n\nZodiac: ${fact.zodiac}\nSymbol: ${fact.symbol}\nElements: ${fact.element}\nRuling Planet: ${fact.ruling_planet}\n\nFacts: ${fact.fact}\n\nPersonality Traits:\n${fact.personality_traits.join(', ')}\n\nBest Matches: ${fact.best_matches.join(', ')}\n\nWorst Matches: ${fact.worst_matches.join(', ')}\n\n\nAuthor: ${zodiacFacts.author}\nbasin gusto ka mo donate load or gcash kani ang number 09657987021™ Salamat`;
sendMessage(senderId, { text: message }, pageAccessToken);
}
};
