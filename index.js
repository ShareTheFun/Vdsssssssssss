const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html'));
});

app.post('/search', async (req, res) => {
    const query = req.body.query;
    try {
        const response = await axios.get(`https://joshweb.click/api/xsearch?q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;
    try {
        const response = await axios.get(`https://joshweb.click/api/xdl?q=${videoUrl}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching download link');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
