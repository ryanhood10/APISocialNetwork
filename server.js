// require the extensions needed to run the application
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect mongoose to connect or wrap with the mongodb database, insert the database connection as a string localhost+databasename
mongoose.connect('mongodb://127.0.0.1:27017/subscribers', 
//passing useNewUrlParser to true, so it is sure to connect using the new url
{ useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

//hook up some events to the connection
 
const db = mongoose.connection

//db.on error is for if theres an error connecting to the server, it will console.log the error
db.on('error',(error) => console.log(error));

//db.once open is to console.log a successful connection to the server
db.once('open', () => console.log('Connected to Database'));

//SETTING UP MIDDLEWARE
//allow the app to run JSON
app.use(express.json());

// import route files
const subscribersRoute = require('./routes/subscribers');
const friendsRoute = require('./routes/friendsRoute');



//query'localhost:3000/subscribers' with app.use
app.use('/subscribers', subscribersRoute);

//query 'localhost:3000/:userID of that friend' 
app.use('/api/users/:userId/friends', friendsRoute);


//run the app on localhost3000
app.listen(3000, () => console.log("server started"));