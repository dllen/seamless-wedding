'use strict';

var mongoose = require('mongoose');
var Rsvp = mongoose.model('Rsvp');
var nodemailer = require("emailjs/email");

// create reusable transport method (opens pool of SMTP connections)
var sendmail = nodemailer.server.connect({
  user: "shi_chao_peng@yeah.net",
  password: "Leng123456@",
  host: "smtp.yeah.net",
  ssl: true
})
var lastnamelist = [];


exports.index = function(req, res) {
    var modulePath = "../modules/main/client/view/index";
    res.render(modulePath);
};

exports.moduleViews = function (req, res) {
    var moduleName = req.originalUrl;
    var modulePath = "../modules" + moduleName + "/client/view" + moduleName;
    console.log("modulePath: " + modulePath);
    res.render(modulePath);
};

exports.componentViews = function (req, res) {
  var componentName = req.params.component;
  var moduleName = req.params.module;
  var modulePath = "../modules/" + moduleName + "/client/view/component/" + componentName;
  console.log("modulePath: " + modulePath);
  res.render(modulePath);
};

exports.getAllRsvps = function(req, res) {
    Rsvp.find({"guestbook" : true}, function(err, result) {
        if (!err) {
            return res.json({'rsvps': result});
        } else {
            res.json({'Error': 'Something went wrong'});
        }
    });
};

exports.getAllRsvpInfo = function(req, res) {
  if (req.query.password == "gethitched") {
    Rsvp.find({}, function(err, result) {
        if (!err) {
            return res.json({'rsvps': result});
        } else {
            res.json({'Error': 'Something went wrong'});
        }
    });
  } else {
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    res.json({'Error': "Wrong password."});
  }
  
}
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i].toLowerCase() === obj.toLowerCase()) {
           return true;
       }
    }
    return false;
}

exports.addRsvp = function(req, res) {
  var lastname = req.body.uname.toLowerCase().split(" ");
  lastname = lastname[lastname.length - 1];

  //don't check name is in list
  // if (!contains(lastnamelist, lastname)) {
  //   return res.json({'Error': 'Your name is not on the guestlist. If you believe this is in error, please contact us.'});
  // }
  var newRsvp = new Rsvp({
    "name": req.body.uname,
    "attending": req.body.attending,
    "guests": req.body.guests,
    "song": req.body.song,
    "message": req.body.message,
    "guestbook": req.body.guestbook,
    "email": req.body.email,
    "phone": req.body.phone,
    "address": req.body.address
  });
  console.log(newRsvp);
  newRsvp.save(function(err) {
    if (!err) {
      return console.log('created rsvp');
    } else {
      return console.log(err);
    }
  });
  var songSentence = "";
  if (req.body.song) {
     songSentence = " Don't forget to practice your dance moves for " + req.body.song + "!";
  }
  var seatSent = "1";
  if (parseInt(req.body.guests) > 1) {
    seatSent = req.body.guests;
  }

  var mailOptions = {
    from: "师超鹏 & 姚琳 <shi_chao_peng@yeah.net>", // sender address
    to: req.body.email, // list of receivers
    subject: "师超鹏 & 姚琳 婚礼邀请确认", // Subject line
    text: req.body.uname+", 我们期盼您来参加我们的婚礼! 我们将会准备"+seatSent+"个座位给你, 如果你已经等不及了, 请电话联系我.", // plaintext body
    attachment:[{data:'<div style="text-align: center; color: #333; font-family: HelveticaNeue, sans-serif;font-size: 18px;font-weight: 100;max-width: 600px;margin-left:auto;margin-right:auto;"><div style="padding: 20px;border-radius:5px; background: rgb(100,200,215);"><h1 style="color: #ffffff; font-weight: 100;font-size:34px;margin: 5px;">姚琳 & 师超鹏 wedding</h1></div>'+
    '<img style="margin-top: 10px; border-radius: 5px;" src="http://182.92.192.122:52110/images/email/rsvp-header.jpg"/><div style="padding-left: 20px;padding-right:20px; text-align:left;"><p>'+req.body.uname+',</p><p>我们期盼您来参加我们的婚礼! 非常欢迎您的到来, 如果你已经等不及了, 请电话联系我.</p></div>'+
    '<a href="http://j.map.baidu.com/pbSZ0" target="_blank"><img style="border-radius: 5px;" src="http://182.92.192.122:52110/images/email/map.png"/></a>'+
  '<div style="border-radius:5px;background: rgb(100,200,215); color: #ffffff;padding: 5px; height: 20px;margin-top: 10px;"><p>打电话联系, 回答任何问题或疑虑！</p></div></div>',alternative:true}] // html body
  }
  // send mail with defined transport object
  sendmail.send(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });

  return res.send(newRsvp);
};
