const express = require('express');
const flash = require("connect-flash");
const session = require("express-session");
const { engine } = require('express-handlebars')
const { connect } = require('mongoose')
const { MONGODB_URL, MONGODB_CLOUD_URL, PORT } = require('./config/index')

const Handlebars = require('handlebars');
const methodOverride = require('method-override');
//router catch 
const bookingRoute = require('./routes/bookingRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const busRoute = require("./routes/busRoute")
const passport = require("passport");
require("./middlewares/passport")(passport);
const miniGuideSchema = require('./Model/Miniguide')
const cors = require("cors")
const bodyparser = require("body-parser")
const cloudRoute=require('./routes/cloud')
const cloudinary=require('cloudinary').v2;
const fileuploader=require('express-fileupload')

//config section
cloudinary.config({
    cloud_name: "tyss",
    api_key: "599739858235545",
    api_secret: "yuRCYXH5m1-dAf6uIRfmwIokXn0"
  })
// api keys
const publish_key = 'pk_test_51LVJtgIg8SEJxmbxcxeL1cggTJsRQBXiwec3Qb9g0w3KOj659vzTIG2GNDCaOVM9NBYwc4kgOkIwBnchpfcEnmR700KyIxkVQf';
const secret_key = 'sk_test_51LVJtgIg8SEJxmbxFzBBRf2t2lOce6ynFIwCUQKDuPLHXota9jz2va13UgrqOUaFW7ef4eoq9XjvfYNPnzHMecwT00Dg6TtYPU';
const stripe = require("stripe")(secret_key)

const app = express()
//middleware section starts here
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(fileuploader({
    useTempFiles:true,
}))

//method override
app.use(methodOverride('_method'))

app.use(session({
    secret: "pavan",
    resave: true,
    saveUninitialized: false,
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.SUCCESS_MESSAGE = req.flash("SUCCESS_MESSAGE");
    res.locals.error = req.flash("error");
    res.locals.ERROR_MESSAGE = req.flash("ERROR_MESSAGE");
    res.locals.user = req.user || null;
    res.locals.validuser = req.validuser || null;
    next();
});
//middleware section ends here

Handlebars.registerHelper("check", (onebus, date) => {
    let string = '';
    for (let i = 1; i <= 30; i++) {
        // to filer according to date
        onebus.forEach(bks => {
            if (date === bks.date) {
                // console.log(bks.seatno)
                for (let j = 0; j < bks.seatno.length; j++) {
                    if (bks.seatno[j] == i) {
                        string += `<label for="s${i}"> L${i}</label>
                        <input type="checkbox" name="seat" value="${i}" id="s${i}" checked disabled=true/>`
                        i++
                    }
                }   
            }
        });
        string += `<label for="s${i}"> L${i}</label>
        <input type="checkbox" name="seat" value="${i}" id="s${i}" />`
    }
    return new Handlebars.SafeString(string);
});

//base url starts here
app.get('/', async (req, res) => {
    let guidephotos = await miniGuideSchema.find({}).lean()
    res.render('home', { guidephotos })
})
//base url ends here

//mount section starts here
app.use('/user', userRoute)
app.use('/booking', bookingRoute)
app.use('/admin', adminRoute)
app.use('/bus', busRoute)
app.use('/cloud',cloudRoute)

//mount section ends here

// stripe code starts here
app.post('/stripe',(req,res)=>{
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'Destiny',
        address:{
            line1:'Basavangudi',
            postal_code:'560056',
            city:'Bengaluru',
            state:'Karnataka',
            country:'india'
        }
    }).then((customer)=>{
        return stripe.charges.create({
            amount:7000,
            description:'web development product',
            currency:'USD',
            customer:customer.id
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("Payment Done, visit status page")
    }).catch((err)=>{
        res.send(err)
    })

})
// stripe code ends here








//node js server starts here
let startserver = async () => {
    try {

        if (process.env.NODE_ENV === 'development') {
            //db connection
            await connect(MONGODB_URL)
            console.log('mongodb connected');
        }
        if (process.env.NODE_ENV === 'production') {
            await connect(MONGODB_CLOUD_URL)
            console.log('mongodb cloud connected')
        }
        app.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`server listen port no ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}
startserver()
