const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')))

//creating connection to DB
mongoose
  .connect("mongodb+srv://admin-sabrina:sabrys23@cluster0-kaq8n.mongodb.net/<dbname>?retryWrites=true&w=majority/secrets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
  .route("/:id")
  .get((req, res) => {
    Secret.findOne({_id: req.params.id}, (err, secretFound) =>{
      if(err){
        res.status(404).json({
          success: false,
          message: "an error ocurred while trying to get the register"
        })
      } else {
        return res.status(200).json(secretFound);
      }
    }); 
  });

  /*update secrets endpoint*/
  app.route("/edit/:id")
  .patch((req,res) => {

      Secret.findByIdAndUpdate({_id: req.params.id},
        {
          title: req.body.title,
          content: req.body.content
        }, (error) => {
          if(!error)
          res.status(200).json({
            success: true,
            message: "Your secret has been updated succesfully"
          });
          else
          res.status(400).json({
            success: false,
            message: "There was an error while trying to update the secret, please try again"
          });
        });
    });

  /*delete secrets endpoint*/
app.route("/:id") 
.delete((req,res) => {
  Secret.deleteOne(
    {"_id": req.params.id},
    function(error) {
      if(!error) {
        res.status(200).json({
          success: true,
          message: "The secret has been succesfully deleted"
        })
      } else {
        res.status(400).json({
          success: false,
          message: "There was an error while trying to delete the secret, please try again"
        })
      }
    });
});

//to change from production to local env
if(port == null || port == "") {
  port= 5000;
}
app.listen(port, () => {
  console.log(`Server has started succesfully`);
});
