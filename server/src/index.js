const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.listen(3333, () => console.log('listening on port 3333'));
