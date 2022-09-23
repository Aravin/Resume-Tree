import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { appConfig } from './config';
import { router } from './router';
import { db } from './helpers/db';
import path from 'path';
import { browser } from './helpers/browser';

// initialize the express app
const app = express();

// add middleware
app
    .use(cors({origin: '*'}))
    .use('/public', express.static(__dirname + '/public'))
    .use(async (req, res, next) => {
        // initialize the db
        res.locals.db = db;
        next()
      })
    .use(bodyParser.json())
    .use('/v1', router);


// start the server
app.listen(
    appConfig.port,
    () => console.log(`Resume API is running on PORT ${appConfig.port}`),
    );
