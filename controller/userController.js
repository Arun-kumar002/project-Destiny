const userSchema = require("../Model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const miniGuideSchema = require('../Model/Miniguide')
const express = require('express')
const fast2sms = require('fast-two-sms');
const cors = require('cors')
const { check, validationResult } = require('express-validator')
const app = express()
app.use(cors())



/*@http get method 
@access public
@url/movies/get-movies
*/
const registerTemplate = (req, res) => {
    res.render("users/register");
};



// miniguide get n post method
let miniGuide = (req, res) => {
    res.render('users/miniguide')
}

// let miniGuidepost=async(req,res)=>
// {
//     let {place,description}=req.body;
//     let pictures=req.files[0];
//     let pic1=req.files[1]
//     let pic2=req.files[2]
//     let pic3=req.files[3]
//     let pic4=req.files[4]
//     let pic5=req.files[5]
//     let pic6=req.files[6]
// let data={place,description,pictures,pic1,pic2,pic3,pic4,pic5,pic6}

// await miniGuideSchema(data).save()
//     res.render('home')
// }

let allphotos = async (req, res) => {
    let photos = await miniGuideSchema.find().lean()
    res.render('users/getMiniGuide', { photos })
}


let guideModel = async (req, res) => {
    let Model = await miniGuideSchema.findOne({ _id: req.params.id }).lean();
    res.render("users/guideModel", { Model });
};

// miniguide ends here



/*@http post method 
@access private
@url/movies/create-movies
*/

let newUser;
const registerPOST = async (req, res) => {
    let { username, email, mobile, password, confirmpassword, udetails } = req.body;
    console.log(req.body);
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            let alert = error.array()
            res.render('users/register', { alert })
        }

        else {
            let user = await userSchema.findOne({ email });
            let errors = []
            if (user) {
                errors.push({ text: 'email already exists' });
                res.redirect("/user/register", 302, {})
            } else {
                // save data into database 
                // mongodb filter

                var options = {
                    authorization: 'lmLEDsGhJBSiOGS64ueNnQlRJzG1CGwSaZWDhypXANQU6QSYD9ow0TLieNLp',
                    message: 'test otp code is  YOUR_MESSAGE_HERE-5488',
                    numbers: [mobile]
                };
                fast2sms.sendMessage(options).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });


                newUser = new userSchema({
                    username,
                    email,
                    mobile,
                    password,
                    udetails,
                })

                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {

                        newUser.password = hash;
                        req.flash("SUCCESS_MESSAGE", "Successfully OTP Sent")
                        res.redirect("/user/otp", 302, {});

                    })
                });
            }
        }
    } catch (error) {
        console.log(error)
    }
};
//otp section
let otp = (req, res) => {
    res.render('users/otp')
}
let code = 5488
let otppost = async (req, res) => {
    let { otp } = req.body;
    console.log(otp)
    if (code == otp) {
        await newUser.save()
        req.flash("SUCCESS_MESSAGE", "Successfully Registered Please Login")
        res.redirect("/user/login", 301, {})
    }
    else {
        req.flash("ERROR_MESSAGE", "Enter Valid OTP")
        res.render('users/register')
    }

}
//forgot password otp section

let forgotget = (req, res) => {
    res.render('users/forgot')
}
let userDetails;
let ref;
let chpass;
let forgotpost = async (req, res) => {
    let { mobile, email, password } = req.body;
    chpass = password
    ref = mobile;
    userDetails = await userSchema.findOne({ mobile }).lean()
    var options = {
        authorization: 'lmLEDsGhJBSiOGS64ueNnQlRJzG1CGwSaZWDhypXANQU6QSYD9ow0TLieNLp',
        message: 'test otp code is  YOUR_MESSAGE_HERE-5458',
        numbers: [mobile]
    };
    fast2sms.sendMessage(options).then((response) => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    });
    res.render('users/forgototp')
}
let forgotcode = 5458;
let forgototppost = async (req, res) => {
    let { otp } = req.body;

    if (forgotcode == otp) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err;
            console.log(chpass)
            bcrypt.hash(chpass, salt, async (err, hash) => {
                chpass = hash;
                console.log(chpass)

                await userSchema.updateOne({ mobile: ref }, { password: chpass })
                req.flash("SUCCESS_MESSAGE", "Password Updated")
                res.redirect("/user/login", 301, {})
            })
        });
    }
}

const loginTemplate = (req, res) => {
    res.render("users/login");
};

const verifyLogin = (req, res, next) => {
    // passport strategy
    passport.authenticate('local', {
        successRedirect: "/bus/bookings",
        successFlash: true,
        failureRedirect: "/user/login",
        failureFlash: true,
    })(req, res, next)
    // res.render("bus/bookingPage")
};

const profilePage = (req, res) => {
    res.render("users/profile")
}

const logout = (req, res) => {
    req.logout(() => {

    });
    req.flash('SUCCESS_MESSAGE', 'successfully loged out')
    res.redirect('/user/login', 301, {})
}

// const loginPost = (req, res, next) => {
//     // passport strategy
//     passport.authenticate('local', {
//         successRedirect: "/",
//         failureRedirect: "/users/login",
//         failureFlash: true,
//     })(req, res, next)
// };



/*@http put method 
@access private
@url/movies/update-movies/:id
*/


/*@http delete method 
@access private
@url/movies/delete-movies/:id
*/

module.exports = { registerPOST, registerTemplate, loginTemplate, verifyLogin, miniGuide, allphotos, guideModel, profilePage, logout, otp, otppost, forgotget, forgotpost, forgototppost }



