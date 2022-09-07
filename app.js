const express= require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname= req.body.sname;
  const mail = req.body.mail;
  const data = {
    members:[
      {
        email_address:mail,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/adc85f5abc";
  const options={
    method:"POST",
    auth:"Teja:c5cf48e53eb9a1f26e9cea54506eb4dc-us18"
  }

const request =  https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
      if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
    });
  })
  request.write(jsonData);
  request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
})


//c5cf48e53eb9a1f26e9cea54506eb4dc-us18

//adc85f5abc


app.listen(process.env.PORT || 3000, function(){
  console.log("Server started at port 3000");
});
