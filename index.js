const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set(require('./category/category-controller')(app));
app.set(require('./book/book')(app));

app.get('/', (req, res) => {
    res.send("This is home. Right");
});

app.listen(3003, () => {
    console.log(`Server started on port : 3003`);
});