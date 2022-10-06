const bookingSchema = require('../Model/Booking')
const adminSchema = require("../Model/Admin")
const userSchema = require("../Model/User");

let payload;
let userdetl;

//todo get requests starts here
let bookingPage = async (req, res) => {
    userdetl = req.user.email
    res.render("bus/bookingPage", { userdetl })
}

let busPage = async (req, res) => {
    res.render("bus/busPage")
}

const busDetailPage = (req, res) => {
    res.render("bus/busdetails")
}

const busDetailPage1 = (req, res) => {
    res.render("bus/busdetails1")
}

const busDetailPage2 = (req, res) => {
    res.render("bus/busdetails2")
}

let transactionPage = async (req, res) => {
    console.log(req.body)
    let userstatus = await userSchema.findOne({ email: req.user.email })
    console.log(userstatus)
    let {username,email, mobile, udetails} = userstatus
    res.render("bookings/statusPage", { username,email, mobile, udetails })
}
// todoget request ends here

let dateglobal;

//todo post requests start here

// booking 1st page
let getbookingPage = async (req, res) => {
    let { from, to, date } = req.body
    let from_to = { ...req.body }
    if ((from == '') || (to == '') || (date == '')) {
        res.render("bus/bookingPage")
    } else {
        let busDetails = await adminSchema.find({ $and: [{ startlocation: from }, { endlocation: to }] }).lean()
        res.render("bus/busPage", { from_to, busDetails })
    }
}

// booking 2nd page 
let filterPage = async (req, res) => {
    console.log(req.body)
    let { from, to, date, time, classs } = req.body
    let from_to = { ...req.body }
    let busDetails;

    if (from && to && date && time && classs) {
        if (time == "12") {
            busDetails = await adminSchema.find({ $and: [{ startduration: { $in: ["8", "11"] } }, { startlocation: from }, { endlocation: to }, { class1: classs }] }).lean()
        } else if (time == "13") {
            console.log(time)
            busDetails = await adminSchema.find({ $and: [{ startduration: { $in: ["21", "22"] } }, { startlocation: from }, { endlocation: to }, { class1: classs }] }).lean()
        }
    }
    else if (from && to && date && time && (classs == '')) {
        if (time == "12") {
            busDetails = await adminSchema.find({ $and: [{ startduration: { $in: ["8", "11"] } }, { startlocation: from }, { endlocation: to }] }).lean()
        } else if (time == "13") {
            busDetails = await adminSchema.find({ $and: [{ startduration: { $in: ["21", "22"] } }, { startlocation: from }, { endlocation: to }] }).lean()
        }
    }
    else if (from && to && date && classs && (time == '')) {
        busDetails = await adminSchema.find({ $and: [{ startlocation: from }, { endlocation: to }, { class1: classs }] }).lean()
    }
    else if (from && to && date) {
        busDetails = await adminSchema.find({ $and: [{ startlocation: from }, { endlocation: to }] }).lean()
    }
    res.render("bus/busPage", { from_to, busDetails })
}

// receiving data from booking 2nd page and transfering to seat martix page
let seatPage = async (req, res) => {
    dateglobal = { ...req.body }
    let busid = req.params.id
    let oneBus = await adminSchema.findOne({ travelid: busid }).lean()
    res.render("bookings/confirmationPage", { dateglobal, oneBus, busid })
}

// selecting seat and pushing data to database
let fareDetails = async (req, res) => {
    const key = "pk_test_51LVJtgIg8SEJxmbxcxeL1cggTJsRQBXiwec3Qb9g0w3KOj659vzTIG2GNDCaOVM9NBYwc4kgOkIwBnchpfcEnmR700KyIxkVQf";
    payload = {
        date: req.body.seatdate,
        seatno: req.body.seat,
        useremail: userdetl,
        seattravelid: req.body.seatravelid,
        price: req.body.price,
    }
    storedseatdb(payload)
    // res.redirect("/bus/status", 301, {})
    res.render("bookings/paymentPage", { payload, key })
}

// function to push booking data to database
async function storedseatdb(payload) {
    await adminSchema.updateOne({ travelid: payload.seattravelid }, { $push: { seats: payload } })
    await userSchema.updateOne({ email: userdetl }, { $push: { udetails: payload } })
}



module.exports = { bookingPage, busPage, getbookingPage, seatPage, fareDetails, busDetailPage, busDetailPage1, busDetailPage2, transactionPage, filterPage }