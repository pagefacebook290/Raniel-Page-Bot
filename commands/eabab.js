const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const apiURL = 'https://kaiz-apis.gleeze.com/api/videos';
const PAGE_ACCESS_TOKEN = 'EAASWcZB00spABO0GifETV7w54cKclqQpmZA952DPBxZBSx1Ap037ZBi10MZCGd1bItARGEnWynzlxAHoOmSUEhPiVbADPmHm9fZBqT2SG3xrI0SDZAwXTBbMCKfn5DXGXYHw0Rd7ZBJP43MApl5RzJ2tL6ZARTbCGDOtJoYPasxAZCwUrJZBSVpSOYxzN78HExh46gTiwZDZD';
const VERIFY_TOKEN = 'EAASWcZB00spABO0GifETV7w54cKclqQpmZA952DPBxZBSx1Ap037ZBi10MZCGd1bItARGEnWynzlxAHoOmSUEhPiVbADPmHm9fZBqT2SG3xrI0SDZAwXTBbMCKfn5DXGXYHw0Rd7ZBJP43MApl5RzJ2tL6ZARTbCGDOtJoYPasxAZCwUrJZBSVpSOYxzN78HExh46gTiwZDZD';

app.get('/', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});

app.post('/', (req, res) => {
  const messaging = req.body;
  if (messaging.object === 'page') {
    messaging.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          const text = event.message.text;
          if (text === 'shoti') {
            axios.get(apiURL)
              .then((response) => {
                const videos = response.data;
                const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                const videoURL = randomVideo.video_url;
                const message = {
                  text: `Here's a random video: ${videoURL}`,
                };
                sendMessage(event.sender.id, message);
              })
              .catch((error) => {
                console.error(error);
                const message = {
                  text: 'Error fetching video',
                };
                sendMessage(event.sender.id, message);
              });
          }
        }
      });
    });
  }
  res.status(200).send('OK');
});

function sendMessage(recipientId, message) {
  const payload = {
    recipient: {
      id: recipientId,
    },
    message: message,
  };
  axios.post(`https://graph.facebook.com/v13.0/me/messages?access_token=${pageAccesToken}`, payload)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
