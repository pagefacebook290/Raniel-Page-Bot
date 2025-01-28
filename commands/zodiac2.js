const { sendMessage } = require('../handles/sendMessage');

const zodiacSigns = {
  'Capricorn': { start: '01-01', end: '01-19' },
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
  'Capricorn': { start: '12-22', end: '12-31' }
};

module.exports = {
  name: 'zodiac2',
  description: 'Get the zodiac sign based on the date',
  usage: 'zodiac <month> <day>',
  author: 'raniel',

  /**
   * Execute Zodiac command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    if (args.length < 2) {
      sendMessage(senderId, { text: 'Please provide a month and a day. Usage: zodiac <month> <day>' }, pageAccessToken);
      return;
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
    };const monthNumber = monthMap[month];
    if (!monthNumber) {
      sendMessage(senderId, { text: 'Invalid month. Please provide a valid month name.' }, pageAccessToken);
      return;
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

    sendMessage(senderId, { text: `The zodiac sign for ${month} ${day} is ${zodiacSign}.` }, pageAccessToken);
  }
};
