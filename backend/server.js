const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const response = await axios.post('https://api.deepgram.com/v1/listen', req.file.buffer, {
            headers: {
                'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                'Content-Type': 'application/octet-stream'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error transcribing audio.');
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
