require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const PORT = process.env.PORT || 8080;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];


app.get('/', (req, res) => {
    res.render('index', {messages})
})

app.get('/new', (req, res) => {
    res.render('form')
})

app.post('/new', (req, res) => {
    messages.push({user: req.body.name, text: req.body.text, added: new Date()});
    res.redirect('/');
})


app.listen(PORT, () => console.log(`listening on ${PORT}`))
  