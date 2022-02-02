require('./src/dataAccess/database/mongoose/connect');
const routerMiddleware = require('./src/middlewares/routerMiddleware');
require('dotenv').config({ path: 'config.env' })
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname+'\\uploads'))

function configure() {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    routerMiddleware(app);
}


configure();
app.listen(process.env.PORT, () => console.log("Port "+ process.env.PORT));

