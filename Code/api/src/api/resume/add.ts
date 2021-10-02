import { Request, Response} from 'express';
import { MongoClient } from 'mongodb';

export async function addResume(req: Request, res: Response) {

    try {
        
        const body = req.body;

        // basic validation
        if (!body.user) {
            return res.sendStatus(400);
        }

        if (!body.resume) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resume");

        const response = await collection.insertOne(body);

        res.send(response);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}