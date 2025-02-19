const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    var firstName = req.body.fsname;
    var lastName = req.body.lsname;
    var email = req.body.email;

    const option = {
      url: `https://us10.api.mailchimp.com/3.0/lists/e2d89a0938/members`,
      method: "POST",
      headers: {
          "Authorization": `Bearer 4227e5439454d69786210d8d59f6df0e-us10`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
      })
  };
  

   request(option, function(error, response, body){
      if(error){
        res.sendFile(__dirname + "/failure.html")
        console.log(error);
      } else{
       if(response.statusCode === 200){
        res.sendFile(__dirname + "/sucess.html")
       }else{
        res.sendFile(__dirname + "/failure.html")
        console.log(response.statusCode)
       }
      }
   });
   
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is started on port 3000!!");
});

// api   4227e5439454d69786210d8d59f6df0e-us10
// id e2d89a0938