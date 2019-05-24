const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

var csrfProtection = csrf({ 
    cookie: true 
})

const app = express();


const userRouter = require('./router/userRoute');
const doctorRouter = require('./router/doctorRoute');
const healthKitRouter = require('./router/healthKitRoute');
const adminRouter = require('./router/adminRoute');
const cartRouter = require('./router/cartRoute');
const firstAidRouter = require('./router/firstAidRoute');
const productsRouter = require('./router/productsRoute');
const categoryRouter = require('./router/categoryRoute');
const appointmentRouter = require('./router/appointmentRoute');

const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});


//connecting to mongoose database
mongoose.Promise = global.Promise;
// mongodb://nonny:willy1,.@ds157901.mlab.com:57901/hellomedic
mongoose.connect('mongodb://localhost:27017/hellomedic', { useNewUrlParser: true })
.then(() => console.log('mongod Db connected'))
.catch(err => console.log(err))

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.json());

app.use(cookieParser())
app.use(session({
    secret: 'check', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 180 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session())
//app.use(csrfProtection)
//app.use(session())

//enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods: POST, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/healthKit', healthKitRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/firstAid', firstAidRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);
app.use('/appointment', appointmentRouter )

module.exports = app;