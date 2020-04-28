// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

var activities = [
      {id: 0, todo:"Đi chợ"},
      {id: 1, todo:"Nấu cơm"},
      {id: 2, todo:"Rửa bát"},
      {id: 3, todo:"Học code tại CodersX"}
    ]

app.get('/todos', (request, response) => {
  response.render('index.pug', {
    activities: activities
  });
});

app.get('/todos/search', (request, response) => {
  var q = request.query.q;
  var matchActivity = activities.filter(activity => {
    return activity.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  response.render('index.pug', {
    activities: matchActivity
  });
});

app.get('/todos/create', (request, response) => {
  response.render('create.pug');
})

app.post('/todos/create', (request, response) => {
  activities.push(request.body);
  response.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
