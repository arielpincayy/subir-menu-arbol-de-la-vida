const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');

const Vender = require('./routes/Vender');

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.static('src/public'));
app.use(morgan('dev'));

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(Vender);

app.listen(process.env.PORT||5000,(req,res)=>{
    console.log('Server on port 5000');
});