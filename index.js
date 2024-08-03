//Import modules list
import express from "express"; // for creating express applications
import helmet from 'helmet';  // for enhanced security
import { v4 as uuidv4 } from 'uuid'; // for generating unique ids

const app = express();  // initialised an express application
const port = 5005; // initialised port number

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);  // Logging a message when the app is listening on the specified port
});

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
    "success": true,
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
    id: uuidv4(),
    activity_submitted: Date.now() //adds current date
  };
  
  activities.push(activity); //adds new actviity to 'activities' array
  console.log(activities);
  
  // Sending a response with status code 200
  res.status(200).json({ 
    "success": true,
    "data": activities
  });
});


app.put('/activities', (req,res) => {
  const updatedActivity = req.body;

  //Check if an ID has been sent in the PUT body request and if not return error message
  if(!updatedActivity || !updatedActivity.id) {
    return res.status(400).json({ 
      "error": true,
      "data": null 
    });
  }

  //Make sure that the ID sent in the request matches an existing ID in activites array 
  // Returns the index number in the array that matches the ID. Returns -1 if there is no matching ID.
  const activityIndex = activities.findIndex(activity => activity.id === updatedActivity.id); 


  console.log(activityIndex);

  // If the activity exists, update it
  if (activityIndex !== -1) {
    activities[activityIndex] = updatedActivity;
    console.log(activities);

    return res.status(200).json({
      "success": true,
      "data": activities
    });
  } 
  return res.status(404).json({
    "error": true,
    "message": "Activity not found",
    "data": null
  });
});