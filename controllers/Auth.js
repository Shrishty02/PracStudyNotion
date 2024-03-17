const User=require("../models/User");
const OTP=require("../models/OTP");
const OTPgenerator=require("otp-generator");

exports.sendOTP= async(req,res)=>{
    try{
        const email=req.body.email;

        const exisitingUser=await User.findOne({ email: email});
        if(exisitingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        let otp= OTPgenerator.generate(6,{
            lowerCaseAlphabets:false,
            specialChars:false,
            upperCaseAlphabets: false

        })
        let existingOTP=await OTP.findOne({otp:otp});
        while(existingOTP){
            otp= OTPgenerator.generate(6,{
                lowerCaseAlphabets:false,
                specialChars:false,
                upperCaseAlphabets: false
    
            })
            existingOTP=await OTP.findOne({otp});
        }
        const saveOTP=await OTP.create({email:email,otp:otp});
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        });
    
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }

}
