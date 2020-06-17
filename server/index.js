const express = require("express");
const bodyParser = require("body-parser");
const port = 5000;
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//creating connection to DB
mongoose
  .connect("mongodb://localhost:27017/secrets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Connection error", err.message);
  });

//creating schema
const secretSchema = {
  title: String,
  content: String,
};

//creating model
const Secret = mongoose.model("Secret", secretSchema);

//creating routes
app
  .route("/secrets")
  .get((req, res) => {
    Secret.find((err, secretsFound) => {
      if (err) res.send(err);
      else res.send(secretsFound);
    });
  })

  .post((req, res) => {
    console.log("this is the title inserted:" + req.body.title);
    console.log("this is the content inserted:" + req.body.content);

    const newSecret = new Secret({
      title: req.body.title,
      content: req.body.content,
    });

    newSecret.save((err) => {
      if (err) res.send(err);
      else res.status(200).json({
        success: true,
        message: "secret saved succesfully"
      })
    });
  });

  /*Defining the route for secret details*/
  app
  .route("/details/:id")
  .get((req, res) => {
    const requestedId= req.params.id;

    Secret.findOne({_id: requestedId}, function(err,secretFound){
      if(err){
        res.status(404).json({
          success: false,
          message: "an error ocurred while trying to get the register"
        });
      } else {
        res.send(secretFound);
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
