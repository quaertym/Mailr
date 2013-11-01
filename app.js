var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

app.use(express.bodyParser());

var smtp = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
	user: "", /* mail address here  */
	pass: "" /* password here */
    }
});

app.get('/hello',function(req,res){
    res.send('Hello World!');
});

app.post('/mail',function(req,res){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;
    var body = "from:"+from+"\nto:"+to+"\n"+"subject:"+subject+"\n"+"message:"+message+"\n";
    // sendResponse(res,body);
    
    var mailOptions = {
	from: from,
	to: to,
	subject: subject,
	text: message
    }

    smtp.sendMail(mailOptions, function(error,response) {
	if( error ) {
	    console.log(error);
	} else {
	    var body = "Message sent: "+response.message+"\n";
	    console.log(body);
	    res.send(body);
	}
    });
});

app.listen(3000);
console.log('Listening on port 3000');
