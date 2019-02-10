const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to log to server.log');
    }
  });
  next();
});

app.use((req, res, next)=> {
  res.render('maintenance.hbs',{
    pageTitle : 'Codes at work!',
    welcomeMessage : 'We are upgrading the website. We will get back up soon. Sorry for the inconvinence.'
  });
});

app.use(express.static(__dirname+'/Public'));


hbs.registerHelper('getCurrentYear',()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=> {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name : 'Naruto',
  //   likes : [
  //     'Shadow Clones',
  //     'Ramen'
  //   ]
  // });

  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to my website. Believe it!',
  });
});

app.get('/about',(req, res) => {
  // res.send('Most unpredictable knukle head Ninja. Believe it!');
  res.render('about.hbs',{
    pageTitle : 'About Page',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage : 'Unable to fulfil the request'
  });
});

app.listen(3000, ()=> {
  // console.log(__dirname);
  console.log('Server is up and running on port 3000');
});
