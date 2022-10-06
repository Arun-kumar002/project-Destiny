const bookingSchema = require('../Model/Booking')
const { connect } = require('mongoose')
const http = require('http')
const fs = require('fs')
const checksum_lib = require('./../paytm/checksum')
const config = require('./../paytm/config')
const express = require('express')
const app = express();

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });


/*@http get method 
@access public
@url/movies/get-movies
*/
let paymentdonate = async (req, res) => {
    res.render('bookings/paymentdonate')
}
let transactiondetails;
let donatepaymentPost = async (req, res) => {
    transactiondetails=req.body;
    console.log(transactiondetails);
    // Route for making payment
    var paymentDetails = {
        amount: req.body.amount,
        customerId: req.body.username,
        customerEmail: req.body.email,
        customerPhone: req.body.phoneno
    }
    if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
        res.status(400).send('Payment failed')
    } else {
        var params = {};
        params['MID'] = config.PaytmConfig.mid;
        params['WEBSITE'] = config.PaytmConfig.website;
        params['CHANNEL_ID'] = 'WEB';
        params['INDUSTRY_TYPE_ID'] = 'Retail';
        params['ORDER_ID'] = 'TEST_' + new Date().getTime();
        params['CUST_ID'] = paymentDetails.customerId;
        params['TXN_AMOUNT'] = paymentDetails.amount;
        params['CALLBACK_URL'] = 'http://localhost:5000/bus/bookings';
        params['EMAIL'] = paymentDetails.customerEmail;
        params['MOBILE_NO'] = paymentDetails.customerPhone;

        checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
            var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for testing
            // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

            var form_fields = "";
            for (var x in params) {
                form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
            }
            form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
            res.end('ok');
        });
    }
}


/*@http post method 
@access private
@url/movies/create-movies
*/

/*@http put method 
@access private
@url/movies/update-movies/:id
*/


/*@http delete method 
@access private
@url/movies/delete-movies/:id
*/

module.exports = { paymentdonate, donatepaymentPost }