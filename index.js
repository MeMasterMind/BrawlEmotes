const express = require('express');
const fetch = require("node-fetch")
const path = require('path');
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000;
const URI = process.env.URI
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
dotenv.config()
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const emotes = require("./models/emotes");

app.get('/', (req,res)=>{
  emotes.find().then(emotes=>{
    res.render("index.ejs", {emotes})
  })
})

app.get('/test', (req,res)=>{
  emotes.find().then(emotes=>{
    res.json(emotes)
  })
})

app.post("/test", (req,res)=>{
  console.log(req.body.data)
})

app.get('/pin', (req,res)=>{

  const brawler = req.query.brawler
  const pin = req.query.pin

  emotes.find({brawler,pin}).then(pin=>{
    const emoteLink = pin[0].url
    res.redirect(emoteLink)
  })
})

app.get('/api/emotes', (req,res)=>{
  emotes.find().then(Data=>{res.json(Data)})
})

app.post("/add", (req,res)=>{
  emotes.create({
    brawler: req.body.brawler,
    pin: req.body.pin,
    url:req.body.url,
    rarity: req.body.rarity
  },function(err,res){
    if(err){
      console.log(err)
    }
    else if (res){
      console.log(res)
    }
  })
})

app.get('/sendmessage',(req,res)=>{
  const webURL = process.env.webURL
  const name = req.query.name
  const content = req.query.content
  fetch(webURL,
  {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      content: content+"\n\n <@693116936871084063>",

      allowed_mentions: {
        parse: ['users'],
      },
      
    }),
  }
);
})

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});