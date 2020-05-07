const express = require('express');
const app = express();
const fs = require('./utils/fileSystem');
const path = require('path');

// middleware
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
app.use(fileUpload());
app.use(bodyParser.json());

// routes

app.get('/functions/ls', async (req, res) => {
    const files = (await fs.listFiles('./functions/*.js'))
        .map(f => path.basename(f));
    return res
        .status(200)
        .json(files);
});

app.put('/functions/:name', async (req, res) => {
    const fileLocation = path.join('./functions', req.params.name);
    await fs.putFile(fileLocation, req.files.data.data);
    return res
        .status(200)
        .json();
});

app.post('/functions/invoke/:name', async (req, res) => {
    const name = req.params.name;
    const file = (await fs.listFiles('./functions/*.js'))
        .map(f => path.basename(f))
        .find(f => f == name);

    if (!file) {
        return res
            .status(400)
            .json({error: `function '${name}' not found.`});
    }

    const func = require(`./functions/${file}`);
    const result = await func(req.body);

    return res
        .status(200)
        .json(result);
});

app.listen(3000);
