const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const cors = require("cors");


// TODO add Routes when needed.
//
//
//

//* Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Passport Session Configuration //
//! app.use(sessionMiddleware);

/* Routes */
/*
app.use("/api/insterRouterName", insterRouterNameRouter);
app.use("/api/insterRouterName", insterRouterNameRouter);
app.use("/api/insterRouterName", insterRouterNameRouter);
*/

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});