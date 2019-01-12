const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS = 30;
const cap = new cv.VideoCapture(0);
// cap.set(cv.CAP_PROP_FRAME_WIDTH, 640);
// cap.set(cv.CAP_PROP_FRAME_HEIGHT, 480);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    var flags = [cv.IMWRITE_JPEG_QUALITY, 40];
    const frame = cap.read();
    const image = cv.imencode('.jpg', frame, flags).toString('base64');
    io.emit('image', image);
}, 1000 / FPS);

server.listen(3000);
