
# Social Network API
This is a social network API that allows users to share their thoughts, react to their friends' thoughts, and create a friend list. This API was built using Node.js, Express.js, Mongoose, Dotenv, and Nodemon.

## Installation
To use this API, you'll need to have Node.js and MongoDB installed on your local machine.

Clone the repository to your local machine.

Navigate to the project directory in your terminal.

Install the necessary dependencies by running the following command:

Copy code
npm install express mongoose dotenv nodemon
Create a .env file in the root directory and add the following variables:

makefile
Copy code
NODE_ENV=development
MONGODB_URI=<your MongoDB connection string>
Replace <your MongoDB connection string> with your own MongoDB connection string.

Start the server by running npm start.

## Endpoints
### Thoughts
GET all thoughts: GET /api/thoughts
GET a single thought by ID: GET /api/thoughts/:id
CREATE a new thought: POST /api/thoughts
UPDATE a thought by ID: PUT /api/thoughts/:id
DELETE a thought by ID: DELETE /api/thoughts/:id
### Reactions
CREATE a new reaction to a thought: POST /api/thoughts/:thoughtId/reactions
DELETE a reaction by ID: DELETE /api/thoughts/:thoughtId/reactions/:reactionId
### Users
GET all users: GET /api/users
GET a single user by ID: GET /api/users/:id
CREATE a new user: POST /api/users
UPDATE a user by ID: PUT /api/users/:id
DELETE a user by ID: DELETE /api/users/:id
### Friends
CREATE a new friend: POST /api/users/:userId/friends/:friendId
DELETE a friend: DELETE /api/users/:userId/friends/:friendId
## Technologies Used
Node.js
Express.js
Mongoose
Dotenv
Nodemon
## Author
Developed by Ryan Hood
  https://github.com/ryanhood10
  
