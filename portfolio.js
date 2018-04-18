
var express = require("express");
var path=require('path');
var nodemailer=require('nodemailer');
var request = require("request");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));

app.get("/",function(req,res){
	 request("https://maps.googleapis.com/maps/api/geocode/json?address=jaypee+institute+of+information+tecnology+noida+sector-62+A-10&key=AIzaSyBfeJEhYBehzdv61AfFCdcqwZ_J2DcrzWM",function(error,response,body){
  if(!error && response.statusCode == 200)
  {
  	var parser = JSON.parse(body);
  	var lat = (parser["results"][0]["geometry"]["location"]["lat"]);
  	var lng = (parser["results"][0]["geometry"]["location"]["lng"]);
  	var data = {lat : lat , lng : lng};
  	res.render("portfolio1.ejs",{data : data});
  }
  });
});

app.get("/resume",function(req,res){
    res.render("resume3.ejs");
});

app.get("/resume1",function(req,res){
    res.render("resume1.ejs");
});

app.get("/gmail",function(req,res){
    res.render("gmail.ejs");
});

app.get("/navvar",function(req,res){
    res.render("navvar.ejs");
});

app.get("/navvar1",function(req,res){
    res.render("navvar1.ejs");
});
app.post('/signup', function(req, res){
	var email = req.body.Email;
	var name = req.body.Name;
	var msg = req.body.message;
	var data = {name : name , email : email , message : msg};
	var transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', //Change HOST
        port:   587,
        secure: false, 
        auth: {
            user: 'robinjain1414@hotmail.com',   // generated ethereal user
            pass: 'robinjain14'                  // generated ethereal password
        }
    });
    let mailOptions = {
        from: 'robinjain1414@hotmail.com', // sender address
        to: 'robinjain9587@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello testing with    '+name+'    email    '+email+ '     '+msg // plain text body
    };
    transporter.sendMail(mailOptions, function(error, info){
    	if(error){
        	return console.log(error);
    	}
    	console.log('Message sent: ' + info.response);
    	res.end("Submitted Successfully!");
	});
});

  

app.listen('1414',function(){
	console.log("sever is started");
});