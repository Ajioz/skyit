var express = require('express');
var bodyParser =  require('body-parser');
const knex = require('knex');
const sendMail = require('./mail');
const app = express(); 

const log = console.log;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// // create application/x-www-form-urlencoded parser
// app.use(express.urlencoded({ 
//     extended: false 
// }));

app.use(express.json());


const db = knex({
    client: 'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }   
});

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

//Get Home Page
app.get('', (req, res)=>{
    res.render('index')
})

//Get About Page
app.get('/about', (req, res) => {
    res.render('about')
})

//Get Gallery Page
app.get('/gallery', (req, res) => {
    res.render('gallery')
})

//Get service page
app.get('/services', (req, res) => {
    res.render('services')
})

//Make a post
app.post('/', urlencodedParser, (req, res) => {
    
    const {first_name, last_name, email, message} = req.body;
    
    res.render('contact-success', {data: req.body});
    
    log('data:', req.body);
    
    db('clients').returning('*').insert({
        first_name, last_name, email, message,
        set_date: new Date()
    }).then(response => { 
        // return res.send(response[0]); 
    }).catch(err => {
            return res.status(400).send('err');
    })
    
    sendMail(first_name, last_name, email, message, function(err, data){
        if(err){
           //res.status(500).send({text: 'Internal Error'});
        }else{
            res.send({text: 'Email Sent!!!'});
        }
    });

 });



let port = process.env.PORT || 3001;

app.listen(port, () => {
    log((`Server communicating on port ${port}...`));
});
