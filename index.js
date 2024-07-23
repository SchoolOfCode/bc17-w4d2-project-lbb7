import express from "express";
import helmet from 'helmet';
const app = express();
const port = 3002;

app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).send('Hello LBB7!');  // Sending a response with status code 200
  });

app.get('/activities', (req, res) => {
    res.status(200).send('Hello testing!');  // Sending a response with status code 200
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);  // Logging a message when the app is listening on the specified port
  });