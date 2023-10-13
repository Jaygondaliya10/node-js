var usermodel = require('../model/usermodel');

var nodemailer = require('nodemailer');

const storage = require('node-persist');





exports.register = async (req, res) => {


    var data = await usermodel.create(req.body);



    var OTP = Math.floor((Math.random() * 1000000) + 1);

    await storage.init( /* options ... */);
    await storage.setItem('otp', OTP)

    if (data) {

        // Sending mail code


        var send_email = data.email;
        var send_text = data.text;


        await storage.init( /* options ... */);
        await storage.setItem('email', send_email);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'apitest127001@gmail.com',
                pass: 'oppnsgqpeixkrduo'
            }
        });

        var mailOptions = {
            from: 'apitest127001@gmail.com',
            to: send_email,
            subject: 'Sending Email using Node.js',
            text: "Your otp is: " + OTP
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

    res.status(200).json({

        status: "success",
        data

    })

}



exports.checkotp = async (req, res) => {


    await storage.init( /* options ... */);
    var old_otp = await storage.getItem('otp');
    var send_user = await storage.getItem('email');


    var new_otp = req.body.OTP;


    if (old_otp == new_otp) {

        res.status(200).json({

            status: "Verify Successfully...!!!"

        })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'apitest127001@gmail.com',
                pass: 'oppnsgqpeixkrduo'
            }
        });

        var mailOptions = {
            from: 'apitest127001@gmail.com',
            to: send_user,
            subject: 'Sending Email using Node.js',
            text: "Welcome to our World"
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    } else {

        res.status(200).json({

            status: "check your otp"
        })

    }


}