const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required : true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required : true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email pls enter valid email!!" + value)
            }
        }
    },
    password: {
        type: String,
        required : true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://unsplash.com/photos/a-cartoon-character-with-a-weird-haircut-G2Qjx1y9aAM"
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String],
    },
},{timestamps: true});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "devTinder$find",{
        expiresIn: "7d",
    });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordhash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordhash
    );
    return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;