// MotionSensorServer.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let motionDetected = false;

app.post('/motion', (req, res) => {
    motionDetected = req.body.motionDetected;
    console.log('Motion detected:', motionDetected);
    res.send('Motion data received');
});

app.get('/motion-status', (req, res) => {
    res.json({ motionDetected });
});

app.listen(PORT, () => {
    console.log(`Motion Sensor Server is running on http://localhost:${PORT}`);
});
