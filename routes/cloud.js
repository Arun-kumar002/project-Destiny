const express = require('express')
const router = express.Router()
const miniGuideSchema = require('./../Model/Miniguide')
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose')


router.get('/cloudpost', (req, res) => {
    res.render('users/miniguide')
})

router.post('/cloudpost', (req, res, next) => {
    console.log(req.files);
    let pictures1 = req.files.pictures1;
    let pic11 = req.files.pic11;
    let pic21 = req.files.pic21;
    let pic31 = req.files.pic31;
    let pic41 = req.files.pic41;
    let pic51 = req.files.pic51;
    let pic61 = req.files.pic61;
    let place = req.body.place;
    let description = req.body.description;
    let pictures;
    let pic1;
    let pic2;
    let pic3;
    let pic4;
    let pic5;
    let pic6;
    // cloudinary.uploader.upload(pictures1.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //     pictures = result.url
    //     cloudinary.uploader.upload(pic11.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //         pic1 = result.url
    //         cloudinary.uploader.upload(pic21.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //             pic2 = result.url
    //             cloudinary.uploader.upload(pic31.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //                 pic3 = result.url
    //                 cloudinary.uploader.upload(pic41.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //                     pic4 = result.url
    //                     cloudinary.uploader.upload(pic51.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //                         pic5 = result.url
    //                         cloudinary.uploader.upload(pic61.tempFilePath, { folder: "miniguide" }, async (err, result) => {
    //                             pic6 = result.url;

    //                             await new miniGuideSchema({
    //                                 place,
    //                                 pictures,
    //                                 description,
    //                                 pic1,
    //                                 pic2,
    //                                 pic3,
    //                                 pic4,
    //                                 pic5,
    //                                 pic6
    //                             }).save()
    //                             res.render('home')
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })
})

module.exports = router;


