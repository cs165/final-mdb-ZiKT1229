const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));
app.use(jsonParser);

let db = null;
let dbo = null;
async function main() {
  const DB_USER = 'ZiKT1229';
  const DB_PASSWORD = 'CCU-10097';
  const DATABASE_NAME = 'final-mdb';
  const MONGO_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds131737.mlab.com:31737/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
  dbo = db.db(DATABASE_NAME);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
  console.log(`http://localhost:${port}/`);
};

main();

////////////////////////////////////////////////////////////////////////////////

// TODO(you): Add at least 1 GET route and 1 POST route.
app.get('/food', (req, res) => {
  dbo.collection('food').find().toArray((err, result) => {
    if (err) return console.log(err);
    console.log('Get sucess!');
    res.send(JSON.stringify(result));
  });
});

app.post('/food', (req, res) => {
  console.log(req.body);
  dbo.collection('food').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('Post sucess!');
    res.send(req.body);
  });
});
