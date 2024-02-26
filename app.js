const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
/*

TO-DO:
- Delete - admin ✔
- Insert - admin ✔
- Fixing order korisnika !! ✔
- Dodavanje admina/registracija ✔
- Brisanje admina ✔
- Slanje email-a adminu ✔

 */

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
// app.use(express.json());

require('dotenv').config();


//CORS SETTINGS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.setHeader("Access-Control-Allow-Headers", "*");
        return res.status(200).json({});
    }
    next();
});


//**LIMITER **//

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter);

const productRoutes = require('./api/routes/products');
const adminRoutes = require('./api/routes/admin');
const orderRoutes = require('./api/routes/order');


app.use('/products', productRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', orderRoutes);


module.exports = app;