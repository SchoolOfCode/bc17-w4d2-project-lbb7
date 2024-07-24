import express from "express";
import helmet from 'helmet';
const app = express();
const port = 4000;

const data = {
  "data": {
    "id": "54321234",
    "activity_submitted": "1719486190058",
    "activity_type": "run",
    "activity_duration": "30"
  }
};


app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).send('Hello LBB7!');  // Sending a response with status code 200
  });

app.get('/activities', (req, res) => {
    res.status(200).send(data);  // Sending a response with status code 200
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);  // Logging a message when the app is listening on the specified port
  });

  app.post('/activities', (req, res) => {
    const activity = req.body;  // Assuming the request body contains an 'activity' object
    
    if (!activity) {
      // Sending a 400 Bad Request response if no activity data is sent
      return res.status(400).send({ error: 'No activity data provided' });
    }
  
    // You can process the activity data here (e.g., save it to a database)
  
    // Sending a response with status code 200
    res.status(200).send({ message: 'Activity received', activity });
  });