const Otpgenerator = require("otp-generator")
const crypto = require('node:crypto')
require("dotenv").config()
const sendSMS = require("../utils/sendSMS");
const sendMail = require("../utils/sendMail")

async function createOtpPhone(params,callback){
    const otp = Otpgenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
    })
    const ttl = 5 * 60 * 1000
    const expiers = Date.now() + ttl ;
    const data = `${params.phoneNumber}.${otp}.${expiers}`
    const hash = crypto.createHmac("sha256",process.env.OtpKey).update(data).digest('hex')
    const fullHash = `${hash}.${expiers}`
    console.log("your OTP is : ",otp);
    // Send Sms 
    sendSMS(otp,params.phoneNumber);
    return callback(null,fullHash)
}
async function createOtpEmail(params,callback){
    const otp = Otpgenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
    })
    const ttl = 5 * 60 * 1000
    const expiers = Date.now() + ttl ;
    const data = `${params.email}.${otp}.${expiers}`
    const hash = crypto.createHmac("sha256",process.env.OtpKey).update(data).digest('hex')
    const fullHash = `${hash}.${expiers}`
    console.log("your OTP is : ",otp);
    // Send email
    sendMail(otp,params.email)
    return callback(null,fullHash)
}

async function virefyOtpPhone(params,callback){
    let [hashValue , expiers ]= params.hash.split('.');
    const now = Date.now();
    if(now>parseInt(expiers)) return callback(null,"OTP expierd")
    const data = `${params.phoneNumber}.${params.otp}.${expiers}`;
    const newhash = crypto.createHmac("sha256",process.env.OtpKey).update(data).digest('hex')
    if(newhash ===hashValue){
        return callback(null,"Success")
    }
    else {
        return callback(null,"Invalid OTP")
    }
}
async function virefyOtpEmail(params,callback){
    let [hashValue , expiers ]= params.hash.split('.');
    const now = Date.now();
    if(now>parseInt(expiers)) return callback("OTP expierd")
    const data = `${params.email}.${params.otp}.${expiers}`;
    const newhash = crypto.createHmac("sha256",process.env.OtpKey).update(data).digest('hex')
    if(newhash ===hashValue){
        return callback(null,"Success")
    }
    else {
        return callback("Invalid OTP")
    }
}

module.exports = {
    createOtpPhone,
    virefyOtpPhone,
    createOtpEmail,
    virefyOtpEmail
}