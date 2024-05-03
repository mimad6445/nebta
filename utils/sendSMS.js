
require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async(otp,phoneNumber)=>{
    let body = ` your nebtha verification code is ${otp}`
    let msgOption = {
        from : '+213792072901',
        to :  phoneNumber,
        body,
        channel: 'sms'
    }
    console.log("ph !" ,process.env.TWILLO_NUMBER)
    try{
        client.verify.v2.services("VA1ee788d5c47e0319ef02a16593a66c56")
            .verifications
            .create({to: "+213792072901", channel: 'sms',body:body})
            .then(verification => console.log(verification));
    }
    catch(err){  
        console.log(err);
    }
}

module.exports = sendSMS