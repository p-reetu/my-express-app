const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const secret_key = crypto.randomBytes(64).toString('hex');


const app = express();
const port = 3000;

const path = require('path');

app.use(cookieParser());
app.use(session({
    secret: secret_key,
    resave: true,
    saveUninitialized: true
 }));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('calc');
});

app.post('/calc', (req, res) => {
    if(req.body.curr == "INR"){
        res.render('calc', {
            curr: req.body.curr, 
            amount: req.body.amount,
            equal: '=',
            curr2: 'USD',
            calcamt: req.body.amount/75
        });    
    }
    else if(req.body.curr == "USD"){
        res.render('calc', {
            curr: req.body.curr, 
            amount: req.body.amount,
            equal: '=',
            curr2: 'INR',
            calcamt: req.body.amount*75
        });
    }
});

app.listen(port, () => {
    console.log("Server is running...");
    console.log("http://localhost:3000");
});