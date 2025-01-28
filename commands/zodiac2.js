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
  name: 'zodiac',
  description: 'Get the zodiac sign for a given date',
  usage: 'zodiac [date]',
  author: 'raniel',
  async execute(senderId, args, pageAccessToken) {
    if (args.length === 0) {
      return sendMessage(senderId, { text: 'Please provide a date (e.g. "zodiac November 21")' }, pageAccessToken);
    }
    const date = args[0];
    const sign = getZodiacSign(date);
    const message = `The zodiac sign for ${date} is ${sign}.`;
    sendMessage(senderId, { text: message }, pageAccessToken);
  }
};
