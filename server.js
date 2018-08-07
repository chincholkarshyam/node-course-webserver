const express = require('express'); //web framework module to make server
const hbs  = require('hbs');//handler bar module

const fs = require('fs');

var app = express(); 

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engin', 'hbs');


//middle ware which gets called after request but before handling request
app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (error) =>{
        if(error){
            console.log("unable to write log to the server");
        }    
    });
   next(); 
});

/*
app.use((req, res, next) => {
    res.render('mentainance.hbs');
});
*/

app.use(express.static(__dirname+"/public")); //pathe where static files can be seen


//helpers
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});


//routes
app.get('/', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");  

    
    res.render('home.hbs',{
        pageTitle:"About Page!!",
        CurrentDate: new Date().getFullYear(),
        welcomeMessage : 'Hi Welcome to this site'
    });
});

app.get('/about',(req, res) =>{
   res.render('about.hbs',{
       pageTitle:"About Page!!"
   });
});


app.get('/bad', (req, res) => {
   res.send({
       errorCode: "BAD_REQUEST",
       errorMessage : "Can not full fill the request."
   }); 
});


//port for listening
app.listen(3500, () => {
    console.log('Server is up with port 3500');
});