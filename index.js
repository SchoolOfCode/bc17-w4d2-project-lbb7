import express from "express";
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 4000;

const activities = [
  {
    "id": "54321234",
    "activity_submitted": "1719486190058",
    "activity_type": "run",
    "activity_duration": "30"
  }
];

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello LBB7!');  // Sending a response with status code 200
});

app.get('/activities', (req, res) => {
  res.status(200).json({
    "error": null,
    "data": activities
  });  // Sending a response with status code 200
});

app.post('/activities', (req, res) => {
  const newActivity = req.body;  // Assuming the request body contains the new activity object

  if (!newActivity || !newActivity.activity_type || !newActivity.activity_duration) {
    // Sending a 400 Bad Request response if no activity data is sent or if required fields are missing
    return res.status(400).json({ 
      "error": true,
      "data": null 
    });
  }

  const activity = {
    ...newActivity,
    id: 12345, //uuid4(),
    activity_submitted: Date.now()
  };

  activities.push(activity);
  console.log(activity);

  // Sending a response with status code 200
  res.status(200).send({ 
    message: 'Activity received', 
    activity 
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);  // Logging a message when the app is listening on the specified port
});