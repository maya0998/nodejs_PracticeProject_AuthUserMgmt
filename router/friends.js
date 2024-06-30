const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};

function getFriendbyemail(email){
 return friends[email];
}

// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // Update the code here
  res.send(JSON.stringify(friends));
 // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  // Update the code here
  let em=req.params.email;
  let fr=getFriendbyemail(em);
  res.send(JSON.stringify(fr));
  //res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// POST request: Add a new friend
router.post("/", function(req, res) {
  // Check if email is provided in the request body
  if (req.body.email) {
      // Create or update friend's details based on provided email
      friends[req.body.email] = {
          "firstName": req.body.firstName,
           "lastName":req.body.lastName,
           "DOB":req.body.DOB
      };
  }
  // Send response indicating user addition
  res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  let frined = friends[req.params.email];
  if(frined){

    if (req.params.email) {
      // Create or update friend's details based on provided email
      friends[req.params.email] = {
          "firstName": req.body.firstName,
           "lastName":req.body.lastName,
           "DOB":req.body.DOB
      };
      res.send("The user" + (' ') + (req.body.firstName) + " Has been Updated!");
  }
  res.status(404).send("The user email " + (' ') + "Invalid one!");
  }
  else{
    res.status(404).send("The user Not exist");
  }
 // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Extract email parameter from request URL
  const email = req.params.email;

  if (email) {
      // Delete friend from 'friends' object based on provided email
      delete friends[email];
  }
  
  // Send response confirming deletion of friend
  res.send(`Friend with the email ${email} deleted.`);
});
module.exports=router;
