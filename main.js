const express = require('express');
const app = express();
const cors = require('cors');
const uuid= require('uuid');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
const users = {};

app.post('/sendlink', async(req, res) => {
    const { email } = req.body;
    const { name }=req.body;
    const{msg}=req.body;
    const{phone}=req.body;
    console.log(name);
    console.log(msg);
    console.log(email);
    const verificationToken = uuid.v4(); // Generate a unique verification token
    // checkAccessTokenExpiration();
  
    users[email] = verificationToken; // Store the verification token
  
    // const verificationLink = `http://localhost:4200/password?token=${verificationToken}+${email}`;
    const transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: 'asp73118@gmail.com',
          pass: 'mndpdpowzlrszdxk'
      }
  })
//2.configure email content.
const mailOptions = {
    from:'asp73118@gmail.com',
    to: 'luryreddy@gmail.com',email,
    subject: `${name}`,
    // text: `Click on the following link to verify your email address: ${verificationLink}`
    text: `Product or Service required : 
             ${msg}
    ph: ${phone}`


  }
//3. send email
try {
   const result =  transporter.sendMail(mailOptions);

   res.status(200).send({"message":"ok"})
   console.log('sent')
} catch (error) {
    console.log('Email send failed with error:', error)
}
});



app.post('/ok',async(req,res)=>{
    const { email } = req.body;
    const { name }=req.body;
    const{msg}=req.body;
    const{phone}=req.body;
    console.log(name);
    console.log(msg);
    console.log(email);
    console.log("ok");
    const verificationToken = uuid.v4(); // Generate a unique verification token
    users[email] = verificationToken; // Store the verification token
    const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'asp73118@gmail.com',
            pass: 'mndpdpowzlrszdxk'
        }
    })
    const mailOptions = {
        from:'asp73118@gmail.com',
        to: 'luryreddy@gmail.com',email,
        subject: `${name}`,
        // text: `Click on the following link to verify your email address: ${verificationLink}`
        text: `Product or Service required : 
                 ${msg}
        ph: ${phone}`
      }
    
      const one = "";
    try {
        const result =  transporter.sendMail(mailOptions);
        res.status(200).send({"message":'one'})
                console.log('sent')
    } catch (error) {
         console.log('Email send failed with error:', error)
         
     }

    res.status(200).send({"message":one})
})




app.listen(4000,function check(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('started');
    }
})
