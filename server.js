const morgan = require('morgan')
const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();

var corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('tiny'))
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
})

const db = require("./app/models");

const uri = "mongodb+srv://Charles:ks200282923@cluster0.agonaw5.mongodb.net/?retryWrites=true&w=majority";
//const uri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Handle errors
//app.use(errorHandler());


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
app.use('/api/v1', require('./app/routes/index.js'));
// Handle not valid route
app.use('*', (req, res) => {
  res
  .status(404)
  .json( {status: false, message: 'Endpoint Not Found'} );
})
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

