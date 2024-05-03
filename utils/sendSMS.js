
require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async(otp,phoneNumber)=>{
    let body = ` your nebtha verification code is ${otp}`
    let msgOption = {
        from : process.env.TWILLO_NUMBER,
        to :  phoneNumber,
        body
    }
    console.log("ph !" ,process.env.TWILLO_NUMBER)
    try{
        const msg = await client.messages.create(msgOption)
        console.log(msg);
    }
    catch(err){  
        console.log(err);
    }
}

module.exports = sendSMS