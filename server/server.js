const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const userCntl = require('./Mongo/controllers');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/login/:username/:password', userCntl.authenticate);

app.post('/user', userCntl.signup);
app.get('/user/:username', userCntl.getUser);

app.post('/user/:username/expenses', userCntl.addExpense);
app.patch('/user/:username/expenses/:expId', userCntl.updateExpense);
app.post('/user/:username/expenses/:expId', userCntl.addComment);
app.delete('/user/:username/expenses/:expId', userCntl.deleteExpense);
app.delete('/user/:username/expenses/:expId/:commentId', userCntl.deleteComment);


app.get('/usermanager', userCntl.getAllUsers);
app.post('/usermanager', userCntl.addUser, userCntl.getAllUsers);
app.delete('/usermanager/:username', userCntl.deleteUser, userCntl.getAllUsers);
app.patch('/usermanager/:userId', userCntl.updateUser, userCntl.getAllUsers);



app.get(/\/(|new_expense|home|login|signup|edit_expense)$/, (req, res) => {
  fs.readFile(path.join(__dirname, '../src/index.html'), 'utf8', (err, html) => {
    res.set({'Content-Type': 'text/html'}).send(html);
  });
});

app.get(/.css/, (req, res) => {
  fs.readFile(path.join(__dirname, '../src/styles.css'), 'utf8', (err, css) => {
    res.set({'Content-Type': 'text/css'}).send(css);
  });
});

app.get(/\/build/, (req, res) => {
  fs.readFile(path.join(__dirname, '../build/bundle.js'), 'utf8', (err, build) => {
    res.set({'Content-Type': 'application/javascript'}).send(build);
  });
});

app.listen(port);