const passport = require("passport");
const userSchema = require("../Model/User");
let bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");

// local strategy
let localStrategy = require("passport-local").Strategy;
module.exports = (passport) => {
    passport.use(
        new localStrategy({ usernameField: "email" }, async function (email, password, done) {
            console.log(email)
            let user = await userSchema.findOne({email:email})
            // let user = await userSchema.findOne({ email });
            console.log(user);
            // user exist or not
            if (!user) {

                return done(null, false, { message: 'user is not exists' })
            }
            // compare password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                console.log('im in bcrypt');
                if (err) throw err;
                if (!isMatch) {
                    done(null, false, 'password is not matched');
                } else {
                    return done(null, user);
                }
            })
        })
    );


    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });//persist data
    passport.deserializeUser(function (id, done) {
        userSchema.findById(id, function (err, user) {
            // console.log(user)
            done(err, user);
        })
    });//get data from session  
};