  const { sendMessage } = require('../handles/sendMessage');
const zodiacSigns = [
{ sign: 'Capricorn', start: 'December 22', end: 'January 19' },
{ sign: 'Aquarius', start: 'January 20', end: 'February 18' },
// ...
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
} else if (month === endMonth && day <= endDay) {
return sign.sign;
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

