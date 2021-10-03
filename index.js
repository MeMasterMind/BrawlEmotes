const express = require('express');
const path = require('path');
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000;
const URI = process.env.URI
const app = express();
const mongoose =require("mongoose")

dotenv.config()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

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

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});