require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

// Routes
app.use('/', require('./routes/index.js'));
//const loginRoutes = require("./routes/login");
//const userInfoRoutes = require("./routes/userInfo");


// Authetication 
app.use((req, res, next) => {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Contained in starting code, evaluate for need. 
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "DELETE, PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if ("OPTIONS" == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Contained in starting code, evaluate for need. 

app.use("/login", loginRoutes);
app.use("/userInfo", userInfoRoutes);

app.listen(PORT);
console.log(`Connected to port ${PORT}`);
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

mongodb.initDb((err) => {
    // Initializes database connection
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});