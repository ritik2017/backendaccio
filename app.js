const express = require('express');
const mongoose = require('mongoose');

const FormModel = require('./FormModel');

const app = express();

app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true})); // middleware

const mongoURI = 'mongodb+srv://myappuser:ritikkumar@cluster0.mjfcg.mongodb.net/backendaccio?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    // console.log(res);
    console.log('Connected to database');
})

app.get('/', (req, res) => {
    res.send('Welcome to my app');
})

// 200 - success, 400 - failue

app.get('/myapi', (req, res) => {

    res.send(`
        <html>
            <head> </head>
            <body>
                <p> My form </p>
                <form action="/submit_form" method="POST"> 
                    <label for="name">Name</label>
                    <input type="text" name="name" required></input>
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" required></input>
                    <label for="email">Email</label>
                    <input type="text" name="email"></input>
                    <label for="grade">Grade</label>
                    <input type="text" name="grade" required></input>
                    <button type="submit">Submit</button>
                </form>
            <body>
        <html>
    `)
})

app.post('/submit_form', async (req, res) => {
    console.log(req.body);
    const { grade, name, phone, email } = req.body;

    if(!grade || !name || !phone) {
        return res.send({
            status: 400,
            message: "Missing data",
            data: req.body
        })
    }

    if(phone.length != 10)  {
        return res.send({
            status: 400,
            message: "Invalid Phone Number",
            data: req.body 
        })
    }

    if(grade.length > 1) {
        return res.send({
            status: 400,
            message: "Invalid Grade",
            data: req.body
        })
    }

    // Write into DB
    let formData = new FormModel({
        name: name,
        grade: grade,
        phone: phone
    })

    if(email)
        formData.email = email;
    
    let formDb = await formData.save();

    console.log(formDb);

    res.send({
        status: 200,
        message: "Form Submmitted Successfully",
        data: formDb
    });
})

app.get('/myapi/rohan', (req, res) => {
    res.send(`Rohan's new API`);
})

app.get('/myapi/:id', (req, res) => {
    res.send("Myapi");
})

app.get('/myapi/:id/:name', (req, res) => {
    console.log(req.params);
    console.log(req.query);
    res.send("Myapi Id");
})



app.listen(4000, () => {
    console.log('Listening on Port 4000');
})

// Node - Runs JS
// Express - Creates a sever
// npm - imports libraries/packages from internet
// API - Small functionality or feature

// npm init - Created/Initialised our repo
// npm install express - Install express

// PORT - number that refers to something in machine listening for request

// API's are not case sensitive

// /myapi?value=100   /myapi/100/ritik

// /results?search_query=backend&filter=latest

// /search?search_key=mobile&color=black&price=below20000

// github.com/:username   github.com/info

// main() 

// Frontend - (Web (HTML), Android App(XML), IOS, Desktop App(HTML))
// Backend - JSON 


// /submit_form

// body -> none - raw -> text - json

// How to get data in api
// GET - query(?), params(/:)
// POST - query(?), params(/:), body({})